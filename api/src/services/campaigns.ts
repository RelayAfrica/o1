import admin from 'firebase-admin';
import {adminDb} from './firebase-admin';

export type Segment = 'all_opted_in' | 'recent_purchasers' | 'inactive' | string;
type CampaignValue = { businessId: string; segment: Segment; title: string; body: string; deepLink?: string; inactiveDays?: number; ctaTitle?: string; ctaColor?: string; palette?: string };

async function eligibleTokens(businessId: string, segment: Segment, inactiveDays = 60) {
  const subscriptions = await adminDb.collection('pushSubscriptions').where('businessId', '==', businessId).where('active', '==', true).get();
  if (segment === 'all_opted_in') return subscriptions.docs;
  if (segment !== 'recent_purchasers' && segment !== 'inactive') {
    const list = await adminDb.collection('pushAudiences').doc(segment).get();
    if (!list.exists || list.get('businessId') !== businessId) return [];
    const customerIds = new Set((list.data()?.customerIds || []).map(String));
    return subscriptions.docs.filter(doc => customerIds.has(String(doc.get('customerId'))));
  }
  const cutoff = Date.now() - (segment === 'inactive' ? inactiveDays : 30) * 86400000;
  const events = await adminDb.collection('crmEvents').where('businessId', '==', businessId).where('type', '==', 'order_completed').get();
  const recent = new Set(events.docs.filter(doc => new Date(String(doc.get('timestamp'))).getTime() >= cutoff).map(doc => String(doc.get('customerId'))));
  return subscriptions.docs.filter(doc => segment === 'recent_purchasers' ? recent.has(String(doc.get('customerId'))) : !recent.has(String(doc.get('customerId'))));
}

export async function campaignAudienceCounts(businessId: string) {
  const subscriptions = await adminDb.collection('pushSubscriptions').where('businessId', '==', businessId).where('active', '==', true).get();
  const events = await adminDb.collection('crmEvents').where('businessId', '==', businessId).where('type', '==', 'order_completed').get();
  const now = Date.now();
  const recent = new Set(events.docs.filter(doc => new Date(String(doc.get('timestamp'))).getTime() >= now - 30 * 86400000).map(doc => String(doc.get('customerId'))));
  const inactiveRecent = new Set(events.docs.filter(doc => new Date(String(doc.get('timestamp'))).getTime() >= now - 60 * 86400000).map(doc => String(doc.get('customerId'))));
  const ids = subscriptions.docs.map(doc => String(doc.get('customerId')));
  const counts: Record<string, number> = { all_opted_in: ids.length, recent_purchasers: ids.filter(id => recent.has(id)).length, inactive: ids.filter(id => !inactiveRecent.has(id)).length };
  const lists = await adminDb.collection('pushAudiences').where('businessId', '==', businessId).get();
  const listData = lists.docs.map(doc => {
    const members = new Set((doc.get('customerIds') || []).map(String));
    counts[doc.id] = ids.filter(id => members.has(id)).length;
    return { id: doc.id, name: String(doc.get('name') || 'Audience list'), count: counts[doc.id] };
  });
  return { ...counts, lists: listData };
}

export async function sendCampaign(value: CampaignValue) {
  const campaignRef = adminDb.collection('campaigns').doc();
  const docs = await eligibleTokens(value.businessId, value.segment, value.inactiveDays);
  const tokens = docs.map(doc => String(doc.get('token')));
  const result = tokens.length ? await admin.messaging().sendEachForMulticast({ tokens, notification: { title: value.title, body: value.body }, data: { deepLink: value.deepLink ?? '', ctaTitle: value.ctaTitle ?? '', ctaColor: value.ctaColor ?? '', palette: value.palette ?? '' } }) : { successCount: 0, failureCount: 0, responses: [] };
  const timestamp = new Date().toISOString();
  await campaignRef.set({ ...value, id: campaignRef.id, status: 'sent', sentCount: result.successCount, failedCount: result.failureCount, createdAt: timestamp });
  const batch = adminDb.batch();
  for (const doc of docs) { const eventRef = adminDb.collection('crmEvents').doc(); batch.set(eventRef, { id: eventRef.id, businessId: value.businessId, customerId: doc.get('customerId'), channel: 'push', type: 'push_sent', payload: { campaignId: campaignRef.id }, timestamp }); }
  await batch.commit();
  return { id: campaignRef.id, sent: result.successCount, failed: result.failureCount };
}
