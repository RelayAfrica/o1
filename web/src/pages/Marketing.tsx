import { Bell, Check, Clock3, Image, Library, Send, Settings2, Share2, Smartphone, Upload, Users, X } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Facebook01Icon,
  InstagramIcon,
  SnapchatIcon,
  TelegramIcon,
  TiktokIcon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

type Tab = 'social' | 'push';
type Platform = 'Instagram' | 'Facebook' | 'TikTok' | 'Telegram' | 'Snapchat' | 'WhatsApp Status';
type Post = { id: string; media: string; mediaType: 'image' | 'video' | null; caption: string; hashtags: string; platforms: Platform[] };
type PushSegment = 'all_opted_in' | 'recent_purchasers' | 'inactive';
type AudienceCounts = Record<PushSegment, number>;
type PushCampaign = { id: string; title: string; body: string; segment: PushSegment; sentCount: number; failedCount: number; createdAt: string };

const platforms: Platform[] = ['Instagram', 'Facebook', 'TikTok', 'Telegram', 'Snapchat', 'WhatsApp Status'];
const socialIcons: Record<Platform, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Facebook: Facebook01Icon,
  TikTok: TiktokIcon,
  Telegram: TelegramIcon,
  Snapchat: SnapchatIcon,
  'WhatsApp Status': WhatsappIcon,
};
const createId = () => globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 bg-ink/30 p-3 sm:p-5"><section className="mx-auto max-h-full w-full max-w-lg overflow-y-auto rounded-[24px] bg-card p-4 shadow-2xl"><button onClick={onClose} className="float-right" aria-label="Close"><X size={20} /></button>{children}</section></div>;
}

function BrandIcon({ platform }: { platform: Platform }) {
  const colors: Record<Platform, string> = {
    Instagram: 'bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400',
    Facebook: 'bg-[#1877F2]',
    TikTok: 'bg-black',
    Telegram: 'bg-[#229ED9]',
    Snapchat: 'bg-[#FFFC00] text-black',
    'WhatsApp Status': 'bg-[#25D366]',
  };

  return <span title={platform} className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${colors[platform]}`}><HugeiconsIcon icon={socialIcons[platform]} size={23} strokeWidth={2.2} /><span className="sr-only">{platform}</span></span>;
}

function PlatformPicker({ value, onChange }: { value: Platform[]; onChange: (next: Platform[]) => void }) {
  const toggle = (platform: Platform) => onChange(value.includes(platform) ? value.filter(item => item !== platform) : [...value, platform]);

  return <div className="flex flex-wrap items-center gap-2 py-1">{platforms.map(platform => <button key={platform} title={platform === 'WhatsApp Status' ? 'Forward to WhatsApp inbox for manual Status posting' : platform} disabled={platform === 'Snapchat' || platform === 'WhatsApp Status'} onClick={() => toggle(platform)} className={`relative rounded-full border p-0.5 disabled:opacity-40 ${value.includes(platform) ? 'border-primary ring-2 ring-primary/25' : 'border-transparent'}`}><BrandIcon platform={platform} />{value.includes(platform) && <Check size={13} className="absolute -right-1 -top-1 rounded-full bg-primary p-0.5 text-primary-foreground" />}</button>)}</div>;
}

export default function Marketing() {
  const [tab, setTab] = useState<Tab>('social');
  const [posts, setPosts] = useState<Post[]>([{ id: createId(), media: '', mediaType: null, caption: '', hashtags: '', platforms: [] }]);
  const [tools, setTools] = useState<'accounts' | 'library' | null>(null);
  const [notice, setNotice] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [cta, setCta] = useState(false);
  const [ctaUrl, setCtaUrl] = useState('');
  const [segment, setSegment] = useState<PushSegment>('all_opted_in');
  const [inactiveDays, setInactiveDays] = useState(60);
  const [audience, setAudience] = useState<AudienceCounts | null>(null);
  const [campaigns, setCampaigns] = useState<PushCampaign[]>([]);
  const [pushSending, setPushSending] = useState(false);
  const update = (id: string, changes: Partial<Post>) => setPosts(items => items.map(post => post.id === id ? { ...post, ...changes } : post));
  const add = () => setPosts(items => [...items, { id: createId(), media: '', mediaType: null, caption: '', hashtags: '', platforms: [] }]);
  const remove = (id: string) => setPosts(items => items.length === 1 ? items : items.filter(post => post.id !== id));
  const upload = (post: Post, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && file.type !== 'video/mp4') {
      setNotice('Choose an image or MP4 video.');
      return;
    }
    update(post.id, { media: URL.createObjectURL(file), mediaType: file.type === 'video/mp4' ? 'video' : 'image' });
  };
  const ready = posts.every(post => post.media && post.platforms.length);
  const businessId = typeof window !== 'undefined' ? localStorage.getItem('relay_business_id') || import.meta.env.VITE_BUSINESS_ID : undefined;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const loadPushData = async () => {
    if (!businessId) return;
    const token = await auth?.currentUser?.getIdToken();
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}`, 'x-business-id': businessId };
    const [audienceResponse, campaignResponse] = await Promise.all([
      fetch(`${apiUrl}/api/v1/businesses/${businessId}/campaigns/push/audiences`, { headers }),
      fetch(`${apiUrl}/api/v1/businesses/${businessId}/campaigns/push`, { headers }),
    ]);
    if (audienceResponse.ok) setAudience((await audienceResponse.json()).data);
    if (campaignResponse.ok) setCampaigns((await campaignResponse.json()).data);
  };
  useEffect(() => { if (tab === 'push') void loadPushData(); }, [tab]);
  const sendPush = async (test = false) => {
    if (!businessId) { setNotice('Select a business before sending a push campaign.'); return; }
    const token = await auth?.currentUser?.getIdToken();
    if (!token) { setNotice('Sign in to send push campaigns.'); return; }
    setPushSending(true);
    try {
      const response = await fetch(`${apiUrl}/api/v1/businesses/${businessId}/${test ? 'notifications/test' : 'campaigns/push/send'}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'x-business-id': businessId, 'Content-Type': 'application/json' },
        body: test ? '{}' : JSON.stringify({ segment, title, body: message, deepLink: cta ? ctaUrl : undefined, inactiveDays: segment === 'inactive' ? inactiveDays : undefined }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message || 'Unable to send push campaign.');
      if (test) setNotice(`Test notification sent to ${payload.data.sent} subscribed device${payload.data.sent === 1 ? '' : 's'}.`);
      else { setNotice(`Campaign sent to ${payload.data.sent} subscribed device${payload.data.sent === 1 ? '' : 's'}.`); setTitle(''); setMessage(''); setCta(false); setCtaUrl(''); void loadPushData(); }
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Unable to send push campaign.'); }
    finally { setPushSending(false); }
  };
  const pushReady = Boolean(title.trim() && message.trim() && title.length <= 80 && message.length <= 240 && (!cta || ctaUrl.trim()));

  return <div className="h-full overflow-y-auto bg-surface-alt/30"><div className="mx-auto max-w-5xl p-3 pb-20 md:p-6">
    <div className="flex rounded-full border border-border bg-card p-1"><button onClick={() => setTab('social')} className={`flex-1 rounded-full py-2 text-sm font-extrabold ${tab === 'social' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Social</button><button onClick={() => setTab('push')} className={`flex-1 rounded-full py-2 text-sm font-extrabold ${tab === 'push' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Push</button></div>
    {notice && <p className="mt-2 rounded-lg bg-muted px-3 py-2 text-xs">{notice}</p>}
    {tab === 'social' ? <section className="mt-3 rounded-[22px] border border-border/50 bg-card p-3 shadow-soft sm:p-4">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Share2 size={18} /><h2 className="font-extrabold">New posts</h2></div><div className="flex gap-1"><button onClick={() => setTools('library')} className="rounded-lg border border-border p-2" aria-label="Content library"><Library size={16} /></button><button onClick={() => setTools('accounts')} className="rounded-lg border border-border p-2" aria-label="Social accounts"><Settings2 size={16} /></button></div></div>
      <p className="mt-2 text-xs text-muted-foreground">Add as many images or MP4 videos as you need. Each item has its own caption and destinations.</p>
      <div className="mt-3 space-y-3">{posts.map((post, index) => <article key={post.id} className="rounded-2xl border border-border p-3">
        <div className="flex items-center justify-between"><b className="text-sm">Post {index + 1}</b>{posts.length > 1 && <button onClick={() => remove(post.id)} className="text-xs font-bold text-destructive">Remove</button>}</div>
        <div className="mt-2"><label className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted text-muted-foreground">{post.media ? (post.mediaType === 'video' ? <video src={post.media} className="h-full w-full object-cover" /> : <img src={post.media} alt="Selected media" className="h-full w-full object-cover" />) : <Upload size={18} />}<input type="file" accept="image/*,video/mp4" onChange={event => upload(post, event)} className="sr-only" /></label><p className="mt-2 text-[11px] text-muted-foreground">Upload an image or MP4 video</p><PlatformPicker value={post.platforms} onChange={next => update(post.id, { platforms: next })} /></div>
        <textarea value={post.caption} onChange={event => update(post.id, { caption: event.target.value })} placeholder="Caption" className="mt-2 h-16 w-full resize-none rounded-lg border border-border p-2 text-sm" /><input value={post.hashtags} onChange={event => update(post.id, { hashtags: event.target.value })} placeholder="#hashtags" className="mt-2 h-9 w-full rounded-lg border border-border px-2 text-xs" />
      </article>)}</div>
      <button onClick={add} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-sm font-bold text-primary"><Upload size={17} />Add Post</button>
      <button onClick={() => setNotice('Publishing will activate once the relevant channel credentials are connected.')} disabled={!ready} className="mt-2 w-full rounded-lg bg-ink py-2.5 text-sm font-extrabold text-white disabled:opacity-50"><Send size={15} className="mr-1 inline" />Publish {posts.length} item{posts.length === 1 ? '' : 's'}</button>
      <details className="mt-2"><summary className="cursor-pointer text-xs font-bold text-muted-foreground">WhatsApp Status handling</summary><p className="mt-2 rounded-lg bg-muted p-2 text-xs">WhatsApp Status items are forwarded to the connected account inbox so a staff member can manually post them to Status.</p></details>
    </section> : <section className="mt-3 rounded-[22px] border border-border/50 bg-card p-3 shadow-soft sm:p-4">
      <div className="flex items-center gap-2"><Bell size={18} /><div><h2 className="font-extrabold">Push campaign</h2><p className="text-xs text-muted-foreground">Send a web push notification to customers who opted in.</p></div></div>
      <div className="mt-4 rounded-xl bg-muted p-3"><div className="flex items-center gap-2 text-sm font-extrabold"><Users size={16} />Audience</div><div className="mt-2 grid gap-2 sm:grid-cols-3">{([['all_opted_in', 'All subscribers'], ['recent_purchasers', 'Recent purchasers'], ['inactive', 'Inactive customers']] as [PushSegment, string][]).map(([value, label]) => <button type="button" key={value} onClick={() => setSegment(value)} className={`rounded-lg border p-2 text-left text-xs font-bold ${segment === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground'}`}><span className="block">{label}</span><span className={`mt-1 block text-[11px] ${segment === value ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{audience ? `${audience[value]} subscribed` : 'Loading audience…'}</span></button>)}</div>{segment === 'inactive' && <label className="mt-3 flex items-center gap-2 text-xs font-bold">Inactive for at least <input type="number" min="1" value={inactiveDays} onChange={event => setInactiveDays(Math.max(1, Number(event.target.value) || 1))} className="h-8 w-16 rounded-lg border border-border bg-card px-2 text-sm" /> days</label>}</div>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_16rem]"><div><label className="text-xs font-bold text-muted-foreground">Notification title <span className="float-right">{title.length}/80</span></label><input value={title} maxLength={80} onChange={event => setTitle(event.target.value)} placeholder="e.g. Your weekend offer is here" className="mt-1 h-10 w-full rounded-lg border border-border px-3 text-sm" /><label className="mt-3 block text-xs font-bold text-muted-foreground">Message <span className="float-right">{message.length}/240</span></label><textarea value={message} maxLength={240} onChange={event => setMessage(event.target.value)} placeholder="Write a clear, helpful message for your customers." className="mt-1 h-24 w-full resize-none rounded-lg border border-border p-3 text-sm" /><label className="mt-3 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={cta} onChange={event => setCta(event.target.checked)} />Open a destination when tapped</label>{cta && <input value={ctaUrl} type="url" onChange={event => setCtaUrl(event.target.value)} placeholder="https://your-store.com/offers" className="mt-2 h-9 w-full rounded-lg border border-border px-2 text-sm" />}</div><aside className="rounded-2xl bg-ink p-4 text-white"><div className="flex items-center gap-2 text-xs font-bold text-white/60"><Smartphone size={15} />NOTIFICATION PREVIEW</div><div className="mt-4 rounded-2xl bg-white p-3 text-ink shadow-lg"><div className="flex gap-2"><div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary"><Bell size={15} /></div><div className="min-w-0"><p className="text-xs font-extrabold">{title || 'Campaign title'}</p><p className="mt-1 text-xs leading-4 text-muted-foreground">{message || 'Your notification message will appear here.'}</p>{cta && <p className="mt-2 text-[11px] font-bold text-primary">Open link</p>}</div></div></div><p className="mt-3 text-xs leading-5 text-white/65">Push campaigns send immediately. Scheduling is not enabled yet.</p></aside></div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => sendPush(true)} disabled={pushSending || !businessId} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-extrabold disabled:opacity-50"><Smartphone size={15} className="mr-1 inline" />Send test</button><button disabled={!pushReady || pushSending || !businessId} onClick={() => sendPush()} className="flex-1 rounded-lg bg-ink py-2.5 text-sm font-extrabold text-white disabled:opacity-50"><Send size={15} className="mr-1 inline" />{pushSending ? 'Sending…' : `Send to ${audience ? audience[segment] : 'audience'}`}</button></div>
      <div className="mt-5 border-t border-border pt-4"><div className="flex items-center gap-2"><Clock3 size={16} /><h3 className="text-sm font-extrabold">Recent push campaigns</h3></div>{campaigns.length ? <div className="mt-3 space-y-2">{campaigns.slice(0, 5).map(campaign => <div key={campaign.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted px-3 py-2 text-xs"><div className="min-w-0"><p className="truncate font-bold">{campaign.title}</p><p className="mt-0.5 text-muted-foreground">{new Date(campaign.createdAt).toLocaleDateString()} · {campaign.segment.replaceAll('_', ' ')}</p></div><span className="flex-none font-extrabold text-primary">{campaign.sentCount} sent</span></div>)}</div> : <p className="mt-3 text-xs text-muted-foreground">No push campaigns sent yet.</p>}</div>
    </section>}
    {tools === 'accounts' && <Sheet onClose={() => setTools(null)}><h2 className="text-lg font-extrabold">Social accounts</h2><div className="mt-4 space-y-2">{platforms.map(platform => <div key={platform} className="flex items-center justify-between rounded-xl border border-border p-3"><div className="flex items-center gap-2"><BrandIcon platform={platform} /><div><b>{platform}</b><p className="text-xs text-muted-foreground">{platform === 'WhatsApp Status' ? 'Connect inbox for manual Status forwarding.' : platform === 'Snapchat' ? 'Unavailable until publishing access is granted.' : 'Not connected'}</p></div></div><button disabled={platform === 'Snapchat'} onClick={() => setNotice(`${platform} connection will open when credentials are added.`)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold disabled:opacity-40">{platform === 'WhatsApp Status' ? 'Connect inbox' : platform === 'Snapchat' ? 'Unavailable' : 'Connect'}</button></div>)}</div></Sheet>}
    {tools === 'library' && <Sheet onClose={() => setTools(null)}><h2 className="text-lg font-extrabold">Content library</h2><p className="mt-3 text-sm text-muted-foreground">Your uploaded images and MP4 videos will appear here once Cloud Storage is connected.</p><Image className="mx-auto my-8 text-muted-foreground" size={34} /></Sheet>}
  </div></div>;
}
