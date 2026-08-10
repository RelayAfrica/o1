import React from 'react';
import {
  Store, Clock, UtensilsCrossed, Truck, CreditCard, MessageCircle, Bell, CheckCircle2, Pencil
} from 'lucide-react';
import { OnboardingData, DAYS_OF_WEEK, DAY_LABELS, ALLERGEN_LABELS, ONBOARDING_STEPS, OnboardingStepId } from '../types';

interface Props {
  data: OnboardingData;
  onNavigateToStep: (stepId: OnboardingStepId) => void;
  onPublish: () => void;
}

function SectionBlock({
  icon,
  title,
  stepId,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  stepId: OnboardingStepId;
  onEdit: (id: OnboardingStepId) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-[#ECEDF1] bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F5F6F8]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F5F6F8] flex items-center justify-center text-[#5B4FE8]">
            {icon}
          </div>
          <p className="font-extrabold text-[#16213E] text-sm">{title}</p>
        </div>
        <button
          onClick={() => onEdit(stepId)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#ECEDF1] text-xs font-bold text-[#5B4FE8] hover:bg-[#F0F0FF] transition-colors"
        >
          <Pencil size={11} /> Edit
        </button>
      </div>
      <div className="px-4 py-4 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-bold text-[#8A8F98] whitespace-nowrap flex-none">{label}</span>
      <span className="text-sm font-semibold text-[#16213E] text-right">{value || <span className="text-[#C0C4CC] italic">Not set</span>}</span>
    </div>
  );
}

function ValidationError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[14px] bg-[#FFF5F5] border border-[#FDECEA] px-4 py-2.5">
      <span className="text-[#E74C3C] flex-none">⚠️</span>
      <p className="text-xs font-bold text-[#E74C3C]">{message}</p>
    </div>
  );
}

function collectErrors(data: OnboardingData): string[] {
  const errors: string[] = [];
  const { businessIdentity: bi, menuCatalog: mc } = data;

  if (!bi.restaurantName.trim()) errors.push('Restaurant name is required');
  if (!bi.whatsappNumber.trim()) errors.push('WhatsApp number is required');
  if (!bi.cuisineType.trim()) errors.push('Cuisine type / description is required');
  if (!bi.address.trim()) errors.push('Address is required');
  if (!bi.contactPhone.trim()) errors.push('Contact phone number is required');

  if (mc.items.length === 0) errors.push('Add at least one menu item before publishing');

  const badItem = mc.items.find(i => !i.name.trim() || !i.price || !i.categoryId);
  if (badItem) errors.push('Every menu item must have a name, price, and category');

  const badPrice = mc.items.find(i => i.price <= 0);
  if (badPrice) errors.push('All menu item prices must be greater than zero');

  // Basic phone validation
  const phoneRe = /^\+?[\d\s\-().]{7,}/;
  if (bi.whatsappNumber && !phoneRe.test(bi.whatsappNumber)) {
    errors.push('WhatsApp number format looks invalid');
  }

  return errors;
}

export default function Step8Review({ data, onNavigateToStep, onPublish }: Props) {
  const { businessIdentity: bi, hoursAvailability: ha, menuCatalog: mc, deliveryFulfillment: df, paymentPolicy: pp, botBehavior: bb, promotions: pr } = data;
  const errors = collectErrors(data);
  const canPublish = errors.length === 0;

  const openDays = DAYS_OF_WEEK.filter(d => ha.weeklySchedule[d].open);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-extrabold text-[#16213E]">Review & confirm</h3>
        <p className="mt-1 text-sm text-[#8A8F98]">Check everything looks right before going live.</p>
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#E74C3C]">Fix before publishing</p>
          {errors.map((e, i) => <ValidationError key={i} message={e} />)}
        </div>
      )}

      {canPublish && (
        <div className="rounded-[20px] border border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[#25D366] flex-none" />
          <p className="text-sm font-bold text-[#166534]">Everything looks good — ready to publish!</p>
        </div>
      )}

      {/* 1. Business identity */}
      <SectionBlock icon={<Store size={15} />} title="Business identity" stepId="business" onEdit={onNavigateToStep}>
        <Row label="Name" value={bi.restaurantName} />
        <Row label="WhatsApp number" value={bi.whatsappNumber} />
        <Row label="Cuisine" value={bi.cuisineType} />
        <Row label="Address" value={bi.address} />
        <Row label="Contact" value={bi.contactPhone} />
      </SectionBlock>

      {/* 2. Hours */}
      <SectionBlock icon={<Clock size={15} />} title="Hours & availability" stepId="hours" onEdit={onNavigateToStep}>
        {ha.closedTodayOverride && (
          <div className="text-xs font-bold text-[#E74C3C] mb-2">⚠️ Closed today (manual override active)</div>
        )}
        {openDays.length === 0 ? (
          <p className="text-xs text-[#8A8F98]">All days set to closed</p>
        ) : (
          openDays.map(d => (
            <Row key={d} label={DAY_LABELS[d]} value={`${ha.weeklySchedule[d].openTime} – ${ha.weeklySchedule[d].closeTime}`} />
          ))
        )}
        {ha.holidays.length > 0 && <Row label="Holiday exceptions" value={`${ha.holidays.length} date${ha.holidays.length !== 1 ? 's' : ''}`} />}
      </SectionBlock>

      {/* 3. Menu */}
      <SectionBlock icon={<UtensilsCrossed size={15} />} title="Menu & inventory" stepId="menu" onEdit={onNavigateToStep}>
        <Row label="Categories" value={mc.categories.length} />
        <Row label="Items" value={mc.items.length} />
        <Row label="In stock" value={mc.items.filter(i => i.inStock).length} />
        {mc.categories.map(cat => (
          <div key={cat.id} className="flex items-center gap-2 py-1 border-t border-[#F5F6F8] first:border-t-0">
            <span>{cat.emoji}</span>
            <span className="text-sm font-bold text-[#16213E]">{cat.name}</span>
            <span className="ml-auto text-xs text-[#8A8F98]">{mc.items.filter(i => i.categoryId === cat.id).length} items</span>
          </div>
        ))}
      </SectionBlock>

      {/* 4. Delivery */}
      <SectionBlock icon={<Truck size={15} />} title="Delivery & fulfillment" stepId="delivery" onEdit={onNavigateToStep}>
        <Row label="Delivery" value={df.deliveryAvailable ? 'Yes' : 'No'} />
        {df.deliveryAvailable && (
          <>
            <Row label="Fee mode" value={df.deliveryFeeMode === 'flat' ? `Flat — ₦${df.flatFee.toLocaleString()}` : `By zone (${df.zones.length} zones)`} />
            {df.estimatedDeliveryTime && <Row label="Est. time" value={df.estimatedDeliveryTime} />}
            {df.coverageDescription && <Row label="Coverage" value={df.coverageDescription} />}
          </>
        )}
        <Row label="Pickup" value={df.pickupAvailable ? 'Yes' : 'No'} />
        {df.minimumOrderValue > 0 && <Row label="Min. order" value={`₦${df.minimumOrderValue.toLocaleString()}`} />}
      </SectionBlock>

      {/* 5. Payment */}
      <SectionBlock icon={<CreditCard size={15} />} title="Payment & policy" stepId="payment" onEdit={onNavigateToStep}>
        <Row label="In-chat payment" value="Enabled (required)" />
        <Row label="Cash on delivery" value={pp.cashOnDelivery ? 'Yes' : 'No'} />
        {pp.cancellationRefundPolicy && <Row label="Refund policy" value="Configured" />}
        {pp.payoutBankName && <Row label="Payout bank" value={pp.payoutBankName} />}
      </SectionBlock>

      {/* 6. Bot behavior */}
      <SectionBlock icon={<MessageCircle size={15} />} title="Bot behavior & FAQ" stepId="bot" onEdit={onNavigateToStep}>
        <Row label="Tone" value={<span className="capitalize">{bb.tone}</span>} />
        <Row label="Emoji usage" value={<span className="capitalize">{bb.emojiUsage}</span>} />
        <Row label="FAQ entries" value={bb.faqEntries.length} />
        <Row label="Escalation triggers" value={bb.escalation.triggers.length} />
        {bb.escalation.escalationWhatsApp && <Row label="Escalation number" value={bb.escalation.escalationWhatsApp} />}
      </SectionBlock>

      {/* 7. Promotions */}
      <SectionBlock icon={<Bell size={15} />} title="Promotions" stepId="promotions" onEdit={onNavigateToStep}>
        <Row label="Promo messages" value={pr.promos.length} />
        <Row label="Push notifications" value={pr.enablePushNotifications ? 'Enabled' : 'Disabled'} />
      </SectionBlock>

      {/* Publish button */}
      <div className="pt-2">
        <button
          onClick={onPublish}
          disabled={!canPublish}
          className={`w-full h-14 rounded-full text-base font-extrabold flex items-center justify-center gap-2 transition-all ${canPublish ? 'bg-[#25D366] text-white shadow-lg hover:bg-[#1EBF5B] active:scale-[0.98]' : 'bg-[#ECEDF1] text-[#C0C4CC] cursor-not-allowed'}`}
        >
          <CheckCircle2 size={20} />
          Publish WhatsApp Store
        </button>
        {!canPublish && (
          <p className="text-center text-xs text-[#8A8F98] mt-2">Fix the issues above to publish your store</p>
        )}
      </div>
    </div>
  );
}
