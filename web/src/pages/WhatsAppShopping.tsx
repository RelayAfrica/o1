/**
 * WhatsApp Shopping System for Relay
 *
 * A first-class WhatsApp sales channel inside the Commerce pillar.
 * Relay owns the commerce engine; WhatsApp is the customer-facing channel.
 *
 * Architecture:
 *  - Uses Relay's existing product catalogue (MOCK_PRODUCTS / INITIAL_PRODUCTS)
 *  - Uses Relay's existing order lifecycle
 *  - Adds WhatsApp-specific onboarding, dashboard, sync engine, QR/link, and analytics
 *  - Fully modular: the same commerce engine can power Telegram/Messenger in future
 */

import React, { useState, useCallback } from 'react';
import {
  MessageCircle, Check, ArrowRight, ChevronLeft, X, Copy,
  QrCode, Share2, RefreshCw, ShoppingBag, Package, Users,
  TrendingUp, AlertCircle, CheckCircle2, Clock, Zap,
  ToggleLeft, ToggleRight, Globe, Phone, CreditCard,
  BarChart2, Eye, Bell, Settings, Plus, Smartphone,
  Truck, UtensilsCrossed, Calendar, MapPin, ExternalLink,
  ChevronRight, Star, Activity, Layers, BadgeCheck,
  RotateCcw, Wifi, WifiOff, ChevronDown,
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '@/lib/data';

// ─── WhatsApp brand colour ────────────────────────────────────────────────────

const WA = '#25D366';       // WhatsApp green
const WA_DARK = '#128C7E';  // WhatsApp teal
const WA_LIGHT = '#DCF8C6'; // WhatsApp bubble green

// ─── Types ───────────────────────────────────────────────────────────────────

type OnboardingStep =
  | 'connect'
  | 'configure'
  | 'catalogue'
  | 'shopping'
  | 'payments'
  | 'checkout'
  | 'publish';

type DashboardView =
  | 'overview'
  | 'catalogue'
  | 'orders'
  | 'analytics'
  | 'automation'
  | 'settings';

type PaymentMethod = 'paystack' | 'flutterwave' | 'bank_transfer' | 'cash' | 'counter';
type FulfilmentType = 'delivery' | 'pickup' | 'dine_in' | 'appointment' | 'queue';
type CheckoutType = 'relay' | 'whatsapp_assisted';
type CatalogueSyncMode = 'all' | 'categories' | 'products';
type SyncStatus = 'synced' | 'syncing' | 'pending' | 'failed';

interface WhatsAppConfig {
  connected: boolean;
  phoneNumber: string;
  displayName: string;
  verified: boolean;
  storeName: string;
  storeDescription: string;
  storePhone: string;
  catalogueSyncMode: CatalogueSyncMode;
  fulfilmentTypes: FulfilmentType[];
  paymentMethods: PaymentMethod[];
  checkoutType: CheckoutType;
  published: boolean;
}

interface CatalogueProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  syncStatus: SyncStatus;
  available: boolean;
}

interface WAOrder {
  id: string;
  customer: string;
  amount: number;
  stage: string;
  date: string;
  items: number;
  channel: 'whatsapp';
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const WA_PRODUCTS: CatalogueProduct[] = MOCK_PRODUCTS.map((p, i) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  category: p.category,
  syncStatus: (p.status === 'Out of Stock' ? 'pending' : i === 1 ? 'syncing' : 'synced') as SyncStatus,
  available: p.status !== 'Out of Stock',
}));

const WA_ORDERS: WAOrder[] = [
  { id: 'WA-001', customer: 'Amara Okafor', amount: 45000, stage: 'New', date: '10:42 AM', items: 3, channel: 'whatsapp' },
  { id: 'WA-002', customer: 'Fatima Abubakar', amount: 12000, stage: 'Confirmed', date: '09:15 AM', items: 1, channel: 'whatsapp' },
  { id: 'WA-003', customer: 'Chinedu Eze', amount: 8500, stage: 'Preparing', date: 'Yesterday', items: 2, channel: 'whatsapp' },
];

const ANALYTICS_DATA = {
  catalogueViews: 1240,
  productViews: 3860,
  orders: 48,
  revenue: 312000,
  avgOrderValue: 6500,
  conversionRate: 3.9,
  cartAbandonment: 28,
  topProducts: [
    { name: 'Jollof Rice Combo', views: 840, orders: 22 },
    { name: 'Grilled Chicken', views: 640, orders: 18 },
    { name: 'Fresh Salad', views: 380, orders: 8 },
  ],
  paymentMix: [
    { method: 'Paystack', pct: 54 },
    { method: 'Bank Transfer', pct: 28 },
    { method: 'Cash', pct: 18 },
  ],
  peakHours: ['12 PM', '1 PM', '7 PM'],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ONBOARDING_STEPS: { id: OnboardingStep; label: string }[] = [
  { id: 'connect',   label: 'Connect' },
  { id: 'configure', label: 'Store' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'shopping',  label: 'Shopping' },
  { id: 'payments',  label: 'Payments' },
  { id: 'checkout',  label: 'Checkout' },
  { id: 'publish',   label: 'Publish' },
];

const FULFILMENT_LABELS: Record<FulfilmentType, string> = {
  delivery: 'Delivery',
  pickup: 'Pickup',
  dine_in: 'Dine-in',
  appointment: 'Appointment',
  queue: 'Queue ordering',
};

const FULFILMENT_ICONS: Record<FulfilmentType, React.ReactNode> = {
  delivery: <Truck size={18} />,
  pickup: <MapPin size={18} />,
  dine_in: <UtensilsCrossed size={18} />,
  appointment: <Calendar size={18} />,
  queue: <Clock size={18} />,
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  paystack: 'Paystack',
  flutterwave: 'Flutterwave',
  bank_transfer: 'Bank Transfer',
  cash: 'Cash on Delivery',
  counter: 'Pay at Counter',
};

const SYNC_STATUS_STYLES: Record<SyncStatus, { color: string; label: string; dot: string }> = {
  synced:  { color: 'text-[#27AE60]', label: 'Synced',  dot: 'bg-[#27AE60]' },
  syncing: { color: 'text-[#5B4FE8]', label: 'Syncing', dot: 'bg-[#5B4FE8] animate-pulse' },
  pending: { color: 'text-[#F5A623]', label: 'Pending', dot: 'bg-[#F5A623]' },
  failed:  { color: 'text-destructive',label: 'Failed',  dot: 'bg-destructive' },
};

const ORDER_STAGE_COLORS: Record<string, string> = {
  New:       'bg-[#F5A623]/10 text-[#C87F0A]',
  Confirmed: 'bg-lime/10 text-lime-dark',
  Preparing: 'bg-ink/5 text-ink',
  Ready:     'bg-[#5B4FE8]/10 text-[#5B4FE8]',
  Completed: 'bg-[#27AE60]/10 text-[#27AE60]',
};

/** Simulates a QR code with a CSS pattern. */
function QRCodeMock({ size = 120 }: { size?: number }) {
  return (
    <div
      className="rounded-[14px] border border-[#ECEDF1] shadow-sm flex-none"
      style={{
        width: size,
        height: size,
        background: 'repeating-conic-gradient(#16213E 0% 25%, #fff 0% 50%) 0 0 / 10px 10px',
      }}
    />
  );
}

/** WhatsApp bubble icon button */
function WABadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center flex-none shadow-sm ${className}`}
      style={{ background: WA }}
    >
      <MessageCircle size={20} className="text-white" />
    </div>
  );
}

/** Step progress bar used in the onboarding wizard */
function StepProgress({
  steps,
  currentId,
  completedIds,
  onGoTo,
}: {
  steps: { id: string; label: string }[];
  currentId: string;
  completedIds: string[];
  onGoTo: (id: string) => void;
}) {
  return (
    <div className="flex items-center w-full">
      {steps.map((s, i) => {
        const done = completedIds.includes(s.id);
        const active = s.id === currentId;
        return (
          <React.Fragment key={s.id}>
            <button
              onClick={() => (done || active) && onGoTo(s.id)}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors flex-none ${
                active ? 'text-ink' : done ? 'text-[#5B4FE8] cursor-pointer hover:opacity-80' : 'text-muted-foreground cursor-default'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-none shadow-sm ${
                  done ? 'text-white' : active ? 'text-white' : 'bg-[#F5F6F8] text-muted-foreground'
                }`}
                style={done ? { background: WA } : active ? { background: '#16213E' } : {}}
              >
                {done ? <Check size={11} /> : i + 1}
              </span>
              <span className="hidden md:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px mx-2 rounded-full transition-colors"
                style={{ background: done ? `${WA}66` : '#ECEDF1' }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/** Two-column wizard layout (form left, preview right) */
function WizardLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview?: React.ReactNode;
}) {
  return (
    <div className="flex-1 overflow-hidden flex">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-8 pb-32 space-y-6">
          {children}
        </div>
      </div>
      {preview && (
        <div className="hidden lg:flex w-[320px] xl:w-[360px] flex-none border-l bg-gradient-to-b from-[#F5F6F8] to-[#ECEDF1] items-center justify-center p-8 flex-col gap-4">
          {preview}
        </div>
      )}
    </div>
  );
}

/** Field wrapper */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1.5 px-1">{hint}</p>}
    </div>
  );
}

/** Styled text input */
function StyledInput({
  value,
  onChange,
  placeholder,
  prefix,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  type?: string;
}) {
  return (
    <div className="flex items-center h-12 rounded-2xl border border-[#ECEDF1] bg-white overflow-hidden focus-within:border-[#5B4FE8] focus-within:ring-2 focus-within:ring-[#5B4FE8]/10 transition-all shadow-sm">
      {prefix && (
        <span className="pl-4 pr-1 text-sm font-bold text-muted-foreground flex-none">{prefix}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 text-sm font-semibold bg-transparent outline-none"
      />
    </div>
  );
}

// ─── WhatsApp Chat Preview (right-side decorative panel) ─────────────────────

function WAChatPreview({ storeName }: { storeName: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest">
        Customer view
      </p>
      <div
        className="w-[200px] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(22,33,62,0.2)] border-[3px] border-[#16213E]/15"
        style={{ background: '#ECE5DD' }}
      >
        {/* Status bar */}
        <div className="h-6 flex items-center justify-between px-3" style={{ background: WA_DARK }}>
          <span className="text-white text-[9px] font-bold truncate max-w-[120px]">{storeName}</span>
          <div className="w-4 h-4 rounded-full flex-none" style={{ background: WA }} />
        </div>
        {/* Chat */}
        <div className="p-2.5 space-y-2 min-h-[140px]">
          {/* Incoming */}
          <div className="bg-white rounded-[10px] rounded-tl-none p-2 max-w-[80%] shadow-sm">
            <p className="text-[8px] font-semibold leading-relaxed" style={{ color: '#303030' }}>
              👋 Welcome to {storeName}! Browse our menu and order instantly.
            </p>
          </div>
          {/* Outgoing */}
          <div className="flex justify-end">
            <div className="rounded-[10px] rounded-tr-none p-2 max-w-[80%] shadow-sm" style={{ background: WA_LIGHT }}>
              <p className="text-[8px] font-semibold" style={{ color: '#303030' }}>Show me the menu 🍽️</p>
            </div>
          </div>
          {/* Product card */}
          <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
            <div className="h-10 flex items-center justify-center" style={{ background: '#F0EBE3' }}>
              <UtensilsCrossed size={12} className="opacity-30" />
            </div>
            <div className="p-1.5">
              <p className="text-[8px] font-bold" style={{ color: '#303030' }}>Jollof Rice Combo</p>
              <p className="text-[8px] font-extrabold" style={{ color: WA_DARK }}>₦4,500</p>
            </div>
            <div className="px-1.5 pb-1.5">
              <div
                className="w-full py-1 rounded-full text-[8px] font-bold text-center text-white"
                style={{ background: WA }}
              >
                Add to cart
              </div>
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div
          className="h-8 flex items-center gap-1.5 px-2 border-t"
          style={{ background: '#F0F0F0', borderColor: '#DDD' }}
        >
          <div className="flex-1 h-5 rounded-full bg-white" />
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: WA }}
          >
            <MessageCircle size={8} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Onboarding Steps ─────────────────────────────────────────────────────────

/** Step 1 — Connect WhatsApp Business */
function StepConnect({
  config,
  onNext,
  onUpdate,
}: {
  config: WhatsAppConfig;
  onNext: () => void;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
}) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(config.connected);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      onUpdate({ connected: true, phoneNumber: '+234 801 234 5678', displayName: "Amara's Kitchen", verified: true });
    }, 1800);
  };

  return (
    <WizardLayout
      preview={
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: connected ? WA : '#F5F6F8' }}
          >
            <MessageCircle size={36} className={connected ? 'text-white' : 'text-muted-foreground'} />
          </div>
          {connected ? (
            <div className="text-center">
              <p className="font-extrabold text-sm text-ink">{config.displayName}</p>
              <p className="text-xs text-muted-foreground">{config.phoneNumber}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 rounded-full" style={{ background: WA }} />
                <span className="text-[11px] font-bold" style={{ color: WA }}>Connected</span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-muted-foreground text-center">
              Connect your WhatsApp Business account to start selling
            </p>
          )}
        </div>
      }
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: WA }}>
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Connect WhatsApp</h2>
            <p className="text-sm text-muted-foreground">Link your WhatsApp Business account</p>
          </div>
        </div>
      </div>

      {connected ? (
        <div className="space-y-4">
          {/* Connected card */}
          <div
            className="rounded-[20px] p-5 space-y-4"
            style={{ background: `${WA}0F`, border: `1.5px solid ${WA}33` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-base shadow-md" style={{ background: WA }}>
                AK
              </div>
              <div>
                <div className="font-extrabold text-base text-ink">{config.displayName}</div>
                <div className="text-sm text-muted-foreground font-semibold">{config.phoneNumber}</div>
              </div>
              <BadgeCheck size={20} className="ml-auto flex-none" style={{ color: WA }} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Status', value: 'Connected', ok: true },
                { label: 'Verified', value: 'Business ✓', ok: true },
                { label: 'Account type', value: 'Business API', ok: true },
                { label: 'Quality', value: 'High', ok: true },
              ].map(item => (
                <div key={item.label} className="bg-white/80 rounded-[14px] p-3 border border-white/60">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">{item.label}</div>
                  <div className={`text-sm font-extrabold ${item.ok ? '' : 'text-destructive'}`} style={item.ok ? { color: WA_DARK } : {}}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full h-14 rounded-full text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all"
            style={{ background: '#16213E' }}
          >
            Continue to Store Setup <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-[20px] border border-[#ECEDF1] p-5 space-y-4 shadow-sm">
            <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">How it works</div>
            {[
              'Relay connects directly to the WhatsApp Business API',
              'Your number stays yours — customers message your existing number',
              'No separate WhatsApp app needed — everything runs through Relay',
              'Verified Business accounts get higher message limits automatically',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-none mt-0.5" style={{ background: `${WA}20` }}>
                  <Check size={10} style={{ color: WA }} />
                </div>
                <span className="text-sm font-semibold text-ink leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full h-14 rounded-full text-white font-extrabold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 hover:opacity-90 transition-all"
            style={{ background: WA }}
          >
            {connecting ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <MessageCircle size={18} />
                Connect WhatsApp Business
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Already connected? <button className="font-bold underline" style={{ color: WA_DARK }}>Use existing account</button>
          </p>
        </div>
      )}
    </WizardLayout>
  );
}

/** Step 2 — Configure Store */
function StepConfigure({
  config,
  onNext,
  onBack,
  onUpdate,
}: {
  config: WhatsAppConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
}) {
  const shoppingLink = `wa.me/2348012345678?text=Hi%20${encodeURIComponent(config.storeName.replace(/\s+/g, ''))}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <WizardLayout
      preview={
        <div className="flex flex-col gap-4 items-center">
          <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest">
            Your QR code
          </p>
          <QRCodeMock size={130} />
          <p className="text-[10px] text-muted-foreground text-center max-w-[150px]">
            Customers scan this to open your WhatsApp store
          </p>
        </div>
      }
    >
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2">
        <ChevronLeft size={15} /> Connect
      </button>

      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Configure Store</h2>
        <p className="text-sm text-muted-foreground mt-1">Set up how your store appears to customers on WhatsApp</p>
      </div>

      <Field label="Store name">
        <StyledInput
          value={config.storeName}
          onChange={v => onUpdate({ storeName: v })}
          placeholder="Amara's Kitchen"
        />
      </Field>

      <Field label="Business phone" hint="This is the WhatsApp number customers will message">
        <StyledInput
          value={config.storePhone}
          onChange={v => onUpdate({ storePhone: v })}
          placeholder="+234 801 234 5678"
          prefix="📱"
        />
      </Field>

      <Field label="Business description" hint="Shown on your WhatsApp Business profile (160 characters max)">
        <textarea
          value={config.storeDescription}
          onChange={e => onUpdate({ storeDescription: e.target.value })}
          rows={3}
          maxLength={160}
          placeholder="Home-cooked meals made with love. Jollof, Egusi, Grills & more."
          className="w-full rounded-2xl border border-[#ECEDF1] bg-white p-4 text-sm font-semibold resize-none outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/10 transition-all shadow-sm"
        />
        <p className="text-[11px] text-muted-foreground mt-1 text-right">
          {config.storeDescription.length}/160
        </p>
      </Field>

      {/* Generated link preview */}
      <div className="bg-white rounded-[20px] border border-[#ECEDF1] p-5 space-y-3 shadow-sm">
        <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
          Your WhatsApp shopping link
        </div>
        <div className="h-12 rounded-2xl flex items-center gap-3 px-4" style={{ background: `${WA}0F`, border: `1px solid ${WA}33` }}>
          <MessageCircle size={15} style={{ color: WA }} className="flex-none" />
          <span className="text-sm font-extrabold flex-1 truncate" style={{ color: WA_DARK }}>
            {shoppingLink}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity"
          style={{ color: WA_DARK }}
        >
          {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy link</>}
        </button>
      </div>

      <button
        onClick={onNext}
        className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors"
      >
        Continue to Catalogue <ArrowRight size={18} />
      </button>
    </WizardLayout>
  );
}

/** Step 3 — Catalogue Source */
function StepCatalogue({
  config,
  onNext,
  onBack,
  onUpdate,
}: {
  config: WhatsAppConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
}) {
  const syncedCount = WA_PRODUCTS.filter(p => p.syncStatus === 'synced').length;
  const pendingCount = WA_PRODUCTS.filter(p => p.syncStatus === 'pending').length;

  return (
    <WizardLayout
      preview={
        <div className="space-y-3 w-full">
          <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest text-center">
            Catalogue status
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-[#ECEDF1] shadow-sm">
              <span className="text-xs font-bold text-muted-foreground">Synced</span>
              <span className="text-sm font-extrabold" style={{ color: WA }}>
                {syncedCount}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-[#ECEDF1] shadow-sm">
              <span className="text-xs font-bold text-muted-foreground">Pending</span>
              <span className="text-sm font-extrabold text-[#F5A623]">{pendingCount}</span>
            </div>
            <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-[#ECEDF1] shadow-sm">
              <span className="text-xs font-bold text-muted-foreground">Total</span>
              <span className="text-sm font-extrabold text-ink">{WA_PRODUCTS.length}</span>
            </div>
          </div>
        </div>
      }
    >
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2">
        <ChevronLeft size={15} /> Store
      </button>

      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Catalogue Source</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Relay products <em>are</em> your WhatsApp catalogue. No duplicate data, ever.
        </p>
      </div>

      {/* Relay-as-source banner */}
      <div
        className="rounded-[20px] p-4 flex items-start gap-3"
        style={{ background: `${WA}0F`, border: `1.5px solid ${WA}33` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-none" style={{ background: WA }}>
          <Layers size={16} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-ink mb-0.5">Relay is the single source of truth</div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            Every product, price, and stock change in Relay syncs to WhatsApp automatically.
            Your business never manages two catalogues.
          </div>
        </div>
      </div>

      {/* Sync mode */}
      <div>
        <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">
          What to sync
        </div>
        <div className="space-y-2">
          {(
            [
              { id: 'all', label: 'Entire catalogue', desc: 'All current and future products sync automatically' },
              { id: 'categories', label: 'Selected categories', desc: 'Choose which categories appear on WhatsApp' },
              { id: 'products', label: 'Selected products', desc: 'Hand-pick exactly which products to list' },
            ] as { id: CatalogueSyncMode; label: string; desc: string }[]
          ).map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ catalogueSyncMode: opt.id })}
              className={`w-full flex items-center gap-4 p-4 rounded-[18px] border-2 text-left transition-all ${
                config.catalogueSyncMode === opt.id
                  ? 'border-ink bg-ink text-white'
                  : 'border-[#ECEDF1] bg-white hover:border-ink/30'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-none ${
                  config.catalogueSyncMode === opt.id ? 'border-white bg-white' : 'border-muted-foreground'
                }`}
              >
                {config.catalogueSyncMode === opt.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-ink" />
                )}
              </div>
              <div>
                <div className={`font-bold text-sm ${config.catalogueSyncMode === opt.id ? 'text-white' : 'text-ink'}`}>
                  {opt.label}
                </div>
                <div className={`text-xs font-medium ${config.catalogueSyncMode === opt.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {opt.desc}
                </div>
              </div>
              {opt.id === 'all' && (
                <span className="ml-auto text-[10px] font-extrabold px-2.5 py-1 rounded-full flex-none" style={{ background: `${WA}22`, color: WA_DARK }}>
                  Recommended
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product list preview */}
      <div>
        <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">
          Products from your catalogue
        </div>
        <div className="space-y-2">
          {WA_PRODUCTS.map(p => {
            const s = SYNC_STATUS_STYLES[p.syncStatus];
            return (
              <div key={p.id} className="bg-white rounded-[18px] border border-[#ECEDF1] p-4 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-[12px] bg-[#F5F6F8] flex items-center justify-center flex-none">
                  <Package size={15} className="text-muted-foreground opacity-50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-ink truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    ₦{p.price.toLocaleString()} · {p.category}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-none">
                  <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                  <span className={`text-[11px] font-bold ${s.color}`}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors"
      >
        Continue to Shopping Config <ArrowRight size={18} />
      </button>
    </WizardLayout>
  );
}

/** Step 4 — Shopping Configuration */
function StepShopping({
  config,
  onNext,
  onBack,
  onUpdate,
}: {
  config: WhatsAppConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
}) {
  const toggle = (type: FulfilmentType) => {
    const current = config.fulfilmentTypes;
    const next = current.includes(type) ? current.filter(t => t !== type) : [...current, type];
    onUpdate({ fulfilmentTypes: next });
  };

  return (
    <WizardLayout>
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2">
        <ChevronLeft size={15} /> Catalogue
      </button>

      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Shopping Configuration</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose how customers can order from your WhatsApp store
        </p>
      </div>

      <div>
        <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">
          Fulfilment types
        </div>
        <div className="space-y-2">
          {(Object.entries(FULFILMENT_LABELS) as [FulfilmentType, string][]).map(([type, label]) => {
            const active = config.fulfilmentTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggle(type)}
                className={`w-full flex items-center gap-4 p-4 rounded-[18px] border-2 text-left transition-all ${
                  active ? 'border-ink bg-ink text-white' : 'border-[#ECEDF1] bg-white hover:border-ink/30'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-none ${
                    active ? 'bg-white/15' : 'bg-[#F5F6F8]'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-muted-foreground'}>
                    {FULFILMENT_ICONS[type]}
                  </span>
                </div>
                <span className={`font-bold text-sm ${active ? 'text-white' : 'text-ink'}`}>
                  {label}
                </span>
                <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none ${
                  active ? 'border-white bg-white' : 'border-muted-foreground'
                }`}>
                  {active && <Check size={12} className="text-ink" />}
                </div>
              </button>
            );
          })}
        </div>
        {config.fulfilmentTypes.length === 0 && (
          <p className="text-xs text-[#F5A623] font-bold mt-2">
            Select at least one fulfilment type to continue
          </p>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={config.fulfilmentTypes.length === 0}
        className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
      >
        Continue to Payments <ArrowRight size={18} />
      </button>
    </WizardLayout>
  );
}

/** Step 5 — Payment Methods */
function StepPayments({
  config,
  onNext,
  onBack,
  onUpdate,
}: {
  config: WhatsAppConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
}) {
  const toggle = (method: PaymentMethod) => {
    const current = config.paymentMethods;
    const next = current.includes(method) ? current.filter(m => m !== method) : [...current, method];
    onUpdate({ paymentMethods: next });
  };

  const PAYMENT_ICONS: Record<PaymentMethod, string> = {
    paystack: '💳',
    flutterwave: '🦋',
    bank_transfer: '🏦',
    cash: '💵',
    counter: '🧾',
  };

  const PAYMENT_DESCS: Record<PaymentMethod, string> = {
    paystack: 'Cards, USSD, bank — verified automatically',
    flutterwave: 'Cards, mobile money, crypto',
    bank_transfer: 'Customer transfers, receipt upload',
    cash: 'Customer pays on delivery',
    counter: 'Customer pays when collecting',
  };

  return (
    <WizardLayout>
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2">
        <ChevronLeft size={15} /> Shopping
      </button>

      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Payment Methods</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select which payment options customers can use. You can add more later.
        </p>
      </div>

      <div className="space-y-2">
        {(Object.entries(PAYMENT_LABELS) as [PaymentMethod, string][]).map(([method, label]) => {
          const active = config.paymentMethods.includes(method);
          return (
            <button
              key={method}
              onClick={() => toggle(method)}
              className={`w-full flex items-center gap-4 p-4 rounded-[18px] border-2 text-left transition-all ${
                active ? 'border-ink bg-ink text-white' : 'border-[#ECEDF1] bg-white hover:border-ink/30'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-none text-lg">
                {PAYMENT_ICONS[method]}
              </div>
              <div className="flex-1">
                <div className={`font-bold text-sm ${active ? 'text-white' : 'text-ink'}`}>{label}</div>
                <div className={`text-xs ${active ? 'text-white/70' : 'text-muted-foreground'} font-medium`}>
                  {PAYMENT_DESCS[method]}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none ${
                active ? 'border-white bg-white' : 'border-muted-foreground'
              }`}>
                {active && <Check size={12} className="text-ink" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onNext}
          className="flex-1 h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors"
        >
          Continue <ArrowRight size={18} />
        </button>
        <button
          onClick={onNext}
          className="h-14 px-6 rounded-full border border-[#ECEDF1] bg-white font-bold text-sm hover:bg-muted transition-colors shadow-sm"
        >
          Skip
        </button>
      </div>
    </WizardLayout>
  );
}

/** Step 6 — Checkout Type */
function StepCheckout({
  config,
  onNext,
  onBack,
  onUpdate,
}: {
  config: WhatsAppConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
}) {
  return (
    <WizardLayout>
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2">
        <ChevronLeft size={15} /> Payments
      </button>

      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Checkout Experience</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose how customers complete their purchase
        </p>
      </div>

      <div className="space-y-4">
        {/* Relay Checkout */}
        <button
          onClick={() => onUpdate({ checkoutType: 'relay' })}
          className={`w-full flex flex-col gap-3 p-5 rounded-[20px] border-2 text-left transition-all ${
            config.checkoutType === 'relay' ? 'border-ink bg-ink text-white' : 'border-[#ECEDF1] bg-white hover:border-ink/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.checkoutType === 'relay' ? 'bg-white/15' : 'bg-[#5B4FE8]/10'}`}>
                <Smartphone size={18} className={config.checkoutType === 'relay' ? 'text-white' : 'text-[#5B4FE8]'} />
              </div>
              <div>
                <div className={`font-extrabold text-base ${config.checkoutType === 'relay' ? 'text-white' : 'text-ink'}`}>
                  Relay Checkout
                </div>
                <div className={`text-xs font-bold ${config.checkoutType === 'relay' ? 'text-white/70' : 'text-[#5B4FE8]'}`}>
                  Recommended
                </div>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none ${
              config.checkoutType === 'relay' ? 'border-white bg-white' : 'border-muted-foreground'
            }`}>
              {config.checkoutType === 'relay' && <Check size={12} className="text-ink" />}
            </div>
          </div>
          <div className={`text-xs leading-relaxed ${config.checkoutType === 'relay' ? 'text-white/80' : 'text-muted-foreground'}`}>
            Customer taps a link in WhatsApp and completes checkout in Relay's in-app browser.
            Full support for cart, discounts, payments, address, and delivery. Works on all phones.
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Cart', 'Discounts', 'Payments', 'Address', 'Delivery'].map(tag => (
              <span
                key={tag}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={config.checkoutType === 'relay' ? { background: 'rgba(255,255,255,0.18)', color: '#fff' } : { background: '#5B4FE8', color: '#fff' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </button>

        {/* WhatsApp Assisted */}
        <button
          onClick={() => onUpdate({ checkoutType: 'whatsapp_assisted' })}
          className={`w-full flex flex-col gap-3 p-5 rounded-[20px] border-2 text-left transition-all ${
            config.checkoutType === 'whatsapp_assisted' ? 'border-ink bg-ink text-white' : 'border-[#ECEDF1] bg-white hover:border-ink/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: config.checkoutType === 'whatsapp_assisted' ? 'rgba(255,255,255,0.15)' : `${WA}18` }}
              >
                <MessageCircle size={18} style={{ color: config.checkoutType === 'whatsapp_assisted' ? '#fff' : WA }} />
              </div>
              <div className={`font-extrabold text-base ${config.checkoutType === 'whatsapp_assisted' ? 'text-white' : 'text-ink'}`}>
                WhatsApp Assisted Checkout
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-none ${
              config.checkoutType === 'whatsapp_assisted' ? 'border-white bg-white' : 'border-muted-foreground'
            }`}>
              {config.checkoutType === 'whatsapp_assisted' && <Check size={12} className="text-ink" />}
            </div>
          </div>
          <div className={`text-xs leading-relaxed ${config.checkoutType === 'whatsapp_assisted' ? 'text-white/80' : 'text-muted-foreground'}`}>
            Customer completes the entire order inside WhatsApp using interactive messages and quick replies.
            Best for simpler menus and customers who prefer staying in the chat.
          </div>
        </button>
      </div>

      <button
        onClick={onNext}
        className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors"
      >
        Review & Publish <ArrowRight size={18} />
      </button>
    </WizardLayout>
  );
}

/** Step 7 — Publish */
function StepPublish({
  config,
  onPublish,
  onBack,
}: {
  config: WhatsAppConfig;
  onPublish: () => void;
  onBack: () => void;
}) {
  const shoppingLink = `https://wa.me/2348012345678?text=Shop`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summary = [
    { label: 'WhatsApp account', value: config.phoneNumber, ok: true },
    { label: 'Store name', value: config.storeName, ok: !!config.storeName },
    {
      label: 'Catalogue',
      value: config.catalogueSyncMode === 'all' ? 'Full catalogue' : 'Filtered',
      ok: true,
    },
    {
      label: 'Fulfilment',
      value: config.fulfilmentTypes.map(t => FULFILMENT_LABELS[t]).join(', ') || 'None set',
      ok: config.fulfilmentTypes.length > 0,
    },
    {
      label: 'Payments',
      value: config.paymentMethods.length > 0
        ? config.paymentMethods.map(m => PAYMENT_LABELS[m]).join(', ')
        : 'Skip for now',
      ok: true,
    },
    {
      label: 'Checkout',
      value: config.checkoutType === 'relay' ? 'Relay Checkout' : 'WhatsApp Assisted',
      ok: true,
    },
  ];

  return (
    <WizardLayout
      preview={
        <div className="flex flex-col items-center gap-4">
          <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest">
            Store QR code
          </p>
          <QRCodeMock size={130} />
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#ECEDF1] text-xs font-bold shadow-sm hover:bg-muted transition-colors">
              <QrCode size={12} /> Download
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm text-white hover:opacity-90 transition-opacity" style={{ background: WA }}>
              <Share2 size={12} /> Share
            </button>
          </div>
        </div>
      }
    >
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2">
        <ChevronLeft size={15} /> Checkout
      </button>

      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Ready to publish</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review your setup and go live. You can change anything later.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-[20px] border border-[#ECEDF1] overflow-hidden shadow-sm">
        {summary.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-5 py-4 ${i < summary.length - 1 ? 'border-b border-[#ECEDF1]' : ''}`}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-none"
              style={{ background: item.ok ? `${WA}20` : '#FEE2E2' }}
            >
              {item.ok ? (
                <Check size={10} style={{ color: WA }} />
              ) : (
                <AlertCircle size={10} className="text-destructive" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">{item.label}</div>
              <div className="text-sm font-bold text-ink truncate">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping link */}
      <div className="bg-white rounded-[20px] border border-[#ECEDF1] p-5 space-y-3 shadow-sm">
        <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
          Your shopping link
        </div>
        <div
          className="h-12 rounded-2xl flex items-center gap-3 px-4"
          style={{ background: `${WA}0F`, border: `1px solid ${WA}33` }}
        >
          <MessageCircle size={15} style={{ color: WA }} className="flex-none" />
          <span className="text-sm font-extrabold flex-1 truncate" style={{ color: WA_DARK }}>
            {shoppingLink}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#ECEDF1] text-xs font-bold hover:bg-muted transition-colors shadow-sm"
          >
            {copied ? <><Check size={12} style={{ color: WA }} /> Copied!</> : <><Copy size={12} /> Copy link</>}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:opacity-90 transition-opacity shadow-sm" style={{ background: WA }}>
            <Share2 size={12} /> Share
          </button>
        </div>
      </div>

      <button
        onClick={onPublish}
        className="w-full h-14 rounded-full text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all"
        style={{ background: WA }}
      >
        <MessageCircle size={18} /> Publish WhatsApp Store
      </button>
    </WizardLayout>
  );
}

// ─── Dashboard Components ─────────────────────────────────────────────────────

/** Metric card */
function MetricCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-[20px] border border-[#ECEDF1] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">{label}</p>
        {icon && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: accent ? `${accent}18` : '#F5F6F8' }}
          >
            <span style={{ color: accent || '#8A8F98' }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-extrabold text-ink">{value}</p>
      {sub && <p className="text-xs text-muted-foreground font-semibold mt-1">{sub}</p>}
    </div>
  );
}

/** Overview dashboard */
function DashboardOverview({ config }: { config: WhatsAppConfig }) {
  const shoppingLink = `https://wa.me/2348012345678?text=Shop`;
  const [copied, setCopied] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-6 bg-[#F5F6F8]">

      {/* Connected account card */}
      <div
        className="rounded-[28px] p-6 md:p-8 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(22,33,62,0.12)]"
        style={{ background: `linear-gradient(135deg, ${WA_DARK}, ${WA})` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center shadow-md">
              <MessageCircle size={28} className="text-white" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white/70 uppercase tracking-widest mb-1">
                WhatsApp Shopping
              </div>
              <div className="text-xl font-extrabold">{config.storeName}</div>
              <div className="text-sm text-white/80 font-semibold">{config.phoneNumber}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-full w-fit border border-white/10">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-extrabold">Live</span>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard label="Products synced" value="3" sub="1 pending" icon={<Package size={15} />} accent={WA} />
        <MetricCard label="Orders today" value="7" sub="+2 vs yesterday" icon={<ShoppingBag size={15} />} accent="#5B4FE8" />
        <MetricCard label="Revenue today" value="₦42,500" sub="+18%" icon={<TrendingUp size={15} />} accent="#27AE60" />
        <MetricCard label="Messages today" value="94" sub="38 unique customers" icon={<MessageCircle size={15} />} accent={WA_DARK} />
        <MetricCard label="Conversion" value="3.9%" sub="vs 3.2% last week" icon={<Activity size={15} />} accent="#F5A623" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Catalogue sync */}
        <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-ink">Catalogue Sync</h3>
            <button
              onClick={handleSync}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:opacity-90 transition-all"
              style={{ background: WA }}
            >
              <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'Syncing…' : 'Sync now'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Last sync', value: '2 min ago', icon: <Clock size={13} />, ok: true },
              { label: 'Next sync', value: 'In 28 min', icon: <RefreshCw size={13} />, ok: true },
              { label: 'Failed syncs', value: '0', icon: <AlertCircle size={13} />, ok: true },
              { label: 'Catalogue health', value: '95%', icon: <CheckCircle2 size={13} />, ok: true },
            ].map(item => (
              <div key={item.label} className="bg-[#F8F9FB] rounded-[16px] p-4 border border-[#ECEDF1]">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
                </div>
                <div className={`text-base font-extrabold ${item.ok ? 'text-ink' : 'text-destructive'}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {WA_PRODUCTS.map(p => {
              const s = SYNC_STATUS_STYLES[p.syncStatus];
              return (
                <div key={p.id} className="flex items-center gap-3 py-2 border-b border-[#ECEDF1] last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-none ${s.dot}`} />
                  <span className="flex-1 text-sm font-semibold text-ink truncate">{p.name}</span>
                  <span className={`text-[11px] font-bold ${s.color}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent WA orders */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-base text-ink">Recent WhatsApp Orders</h3>
            <span
              className="text-[10px] font-extrabold px-2.5 py-1.5 rounded-full"
              style={{ background: `${WA}18`, color: WA_DARK }}
            >
              WhatsApp channel
            </span>
          </div>
          <div className="space-y-3">
            {WA_ORDERS.map(order => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 rounded-[18px] hover:bg-[#F8F9FB] transition-colors cursor-pointer border border-transparent hover:border-[#ECEDF1]"
              >
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-none" style={{ background: `${WA}18` }}>
                  <MessageCircle size={16} style={{ color: WA }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-ink">{order.customer}</div>
                  <div className="text-xs text-muted-foreground font-semibold">
                    {order.date} · {order.items} item{order.items !== 1 ? 's' : ''} · {order.id}
                  </div>
                </div>
                <div className="text-right flex-none">
                  <div className="font-extrabold text-sm text-ink">₦{order.amount.toLocaleString()}</div>
                  <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full ${ORDER_STAGE_COLORS[order.stage] || 'bg-muted text-muted-foreground'}`}>
                    {order.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
        <h3 className="font-extrabold text-base text-ink mb-5">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Sync Catalogue', icon: <RefreshCw size={15} />, action: handleSync, accent: WA },
            { label: 'Generate QR', icon: <QrCode size={15} />, action: () => {}, accent: '#5B4FE8' },
            { label: 'Copy Link', icon: copied ? <Check size={15} /> : <Copy size={15} />, action: handleCopy, accent: '#16213E' },
            { label: 'Open Store', icon: <ExternalLink size={15} />, action: () => window.open(shoppingLink, '_blank'), accent: '#27AE60' },
            { label: 'Payments', icon: <CreditCard size={15} />, action: () => {}, accent: '#F5A623' },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#ECEDF1] bg-[#F8F9FB] text-sm font-bold hover:shadow-sm transition-all hover:border-transparent"
              style={{ color: item.accent }}
            >
              {item.icon}
              {item.label === 'Copy Link' && copied ? 'Copied!' : item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Catalogue management dashboard view */
function DashboardCatalogue() {
  const [products] = useState<CatalogueProduct[]>(WA_PRODUCTS);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-6 bg-[#F5F6F8]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-ink">WhatsApp Catalogue</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Powered by your Relay product catalogue — always in sync
          </p>
        </div>
        <button
          onClick={handleSync}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-bold hover:opacity-90 transition-all shadow-sm"
          style={{ background: WA }}
        >
          <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing…' : 'Force sync'}
        </button>
      </div>

      {/* Automation rules */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
        <h4 className="font-extrabold text-sm text-ink mb-4">Sync Automation (Active)</h4>
        <div className="space-y-2">
          {[
            { trigger: 'Product added', action: 'Publish to WhatsApp', ok: true },
            { trigger: 'Product edited', action: 'Update WhatsApp listing', ok: true },
            { trigger: 'Price changed', action: 'Synchronise immediately', ok: true },
            { trigger: 'Inventory changed', action: 'Update availability', ok: true },
            { trigger: 'Product deleted', action: 'Remove from WhatsApp', ok: true },
            { trigger: 'Product disabled', action: 'Hide from catalogue', ok: true },
          ].map((rule, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#ECEDF1] last:border-0">
              <div className="w-2 h-2 rounded-full flex-none" style={{ background: WA }} />
              <span className="text-sm font-semibold text-muted-foreground flex-none w-40">{rule.trigger}</span>
              <span className="text-[11px] text-muted-foreground font-bold mx-2">→</span>
              <span className="text-sm font-bold text-ink flex-1">{rule.action}</span>
              <CheckCircle2 size={14} style={{ color: WA }} className="flex-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="space-y-3">
        {products.map(p => {
          const s = SYNC_STATUS_STYLES[p.syncStatus];
          return (
            <div key={p.id} className="bg-white rounded-[20px] border border-[#ECEDF1] p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-[14px] bg-[#F5F6F8] flex items-center justify-center flex-none">
                <Package size={18} className="text-muted-foreground opacity-40" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-ink">{p.name}</div>
                <div className="text-xs text-muted-foreground font-semibold">
                  ₦{p.price.toLocaleString()} · {p.category}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                  <span className={`text-[11px] font-bold ${s.color}`}>{s.label}</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  p.available ? 'bg-[#27AE60]/10 text-[#27AE60]' : 'bg-destructive/10 text-destructive'
                }`}>
                  {p.available ? 'Available' : 'Hidden'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Analytics dashboard view */
function DashboardAnalytics() {
  const d = ANALYTICS_DATA;
  const bars = [32, 58, 75, 45, 90, 66, 82, 54, 70, 88, 60, 78, 95, 85, 72];

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-6 bg-[#F5F6F8]">
      <div>
        <h3 className="text-xl font-extrabold text-ink">WhatsApp Analytics</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Last 30 days · WhatsApp channel only</p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Catalogue views', value: d.catalogueViews.toLocaleString(), icon: <Eye size={14} />, accent: WA },
          { label: 'Product views', value: d.productViews.toLocaleString(), icon: <Package size={14} />, accent: '#5B4FE8' },
          { label: 'Orders', value: String(d.orders), icon: <ShoppingBag size={14} />, accent: '#27AE60' },
          { label: 'Revenue', value: `₦${(d.revenue / 1000).toFixed(0)}K`, icon: <TrendingUp size={14} />, accent: '#F5A623' },
          { label: 'Avg. order', value: `₦${d.avgOrderValue.toLocaleString()}`, icon: <CreditCard size={14} />, accent: '#E879A3' },
          { label: 'Conversion', value: `${d.conversionRate}%`, icon: <Activity size={14} />, accent: WA_DARK },
          { label: 'Cart abandon', value: `${d.cartAbandonment}%`, icon: <AlertCircle size={14} />, accent: '#C87F0A' },
          { label: 'Peak hour', value: d.peakHours[0], icon: <Clock size={14} />, accent: '#16213E' },
        ].map(item => (
          <MetricCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue trend */}
        <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
          <h4 className="font-extrabold text-sm text-ink mb-4">Revenue trend (30 days)</h4>
          <div className="flex items-end gap-1 h-28">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{ height: `${h}%`, background: `linear-gradient(to top, ${WA_DARK}, ${WA})`, opacity: 0.85 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-bold text-muted-foreground">Jun 25</span>
            <span className="text-[10px] font-bold text-muted-foreground">Jul 25</span>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
          <h4 className="font-extrabold text-sm text-ink mb-4">Best sellers (WhatsApp)</h4>
          <div className="space-y-3">
            {d.topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-ink">{p.name}</span>
                  <span className="text-sm font-extrabold" style={{ color: WA_DARK }}>{p.orders} sold</span>
                </div>
                <div className="h-2 bg-[#ECEDF1] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(p.orders / d.topProducts[0].orders) * 100}%`,
                      background: `linear-gradient(to right, ${WA_DARK}, ${WA})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment mix */}
        <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
          <h4 className="font-extrabold text-sm text-ink mb-4">Payment methods</h4>
          <div className="space-y-3">
            {d.paymentMix.map(pm => (
              <div key={pm.method}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-ink">{pm.method}</span>
                  <span className="text-sm font-extrabold text-muted-foreground">{pm.pct}%</span>
                </div>
                <div className="h-2 bg-[#ECEDF1] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ink rounded-full transition-all duration-700"
                    style={{ width: `${pm.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak ordering times */}
        <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm">
          <h4 className="font-extrabold text-sm text-ink mb-4">Peak ordering times</h4>
          <div className="space-y-2">
            {[
              { hour: '12 PM – 1 PM', pct: 100, label: 'Lunch rush' },
              { hour: '7 PM – 8 PM', pct: 82, label: 'Dinner orders' },
              { hour: '9 AM – 10 AM', pct: 54, label: 'Morning window' },
            ].map(t => (
              <div key={t.hour}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-ink">{t.hour}</span>
                  <span className="text-[11px] font-bold text-muted-foreground">{t.label}</span>
                </div>
                <div className="h-2.5 bg-[#ECEDF1] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${t.pct}%`, background: `linear-gradient(to right, ${WA_DARK}, ${WA})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Automation settings view */
function DashboardAutomation() {
  const [rules, setRules] = useState([
    // Order automation
    { id: 'r1', group: 'Orders', trigger: 'Order created', action: 'Send confirmation message', enabled: true },
    { id: 'r2', group: 'Orders', trigger: 'Order accepted', action: 'Notify customer: preparing', enabled: true },
    { id: 'r3', group: 'Orders', trigger: 'Order ready', action: 'Notify customer: ready for pickup', enabled: true },
    { id: 'r4', group: 'Orders', trigger: 'Order delivered', action: 'Send delivery notification + receipt', enabled: true },
    { id: 'r5', group: 'Orders', trigger: 'Order completed', action: 'Request review via WhatsApp', enabled: false },
    // Inventory automation
    { id: 'r6', group: 'Inventory', trigger: 'Low stock (< 10)', action: 'Notify business owner', enabled: true },
    { id: 'r7', group: 'Inventory', trigger: 'Out of stock', action: 'Hide product from catalogue', enabled: true },
    { id: 'r8', group: 'Inventory', trigger: 'Restocked', action: 'Republish to WhatsApp', enabled: true },
    // Payment automation
    { id: 'r9', group: 'Payments', trigger: 'Payment received', action: 'Verify, mark paid, send receipt', enabled: true },
    { id: 'r10', group: 'Payments', trigger: 'Payment failed', action: 'Notify customer with retry link', enabled: true },
    // Store automation
    { id: 'r11', group: 'Store', trigger: 'Store closed', action: 'Pause new orders', enabled: true },
    { id: 'r12', group: 'Store', trigger: 'Store open', action: 'Resume orders', enabled: true },
    { id: 'r13', group: 'Store', trigger: 'Holiday mode on', action: 'Disable checkout, show message', enabled: false },
  ]);

  const toggle = (id: string) =>
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));

  const groups = Array.from(new Set(rules.map(r => r.group)));

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-6 bg-[#F5F6F8]">
      <div>
        <h3 className="text-xl font-extrabold text-ink">Automation</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure once — Relay runs everything automatically
        </p>
      </div>

      {groups.map(group => (
        <div key={group} className="bg-white rounded-[24px] border border-[#ECEDF1] overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#ECEDF1] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: WA }} />
            <h4 className="font-extrabold text-sm text-ink">{group} Automation</h4>
          </div>
          <div className="divide-y divide-[#ECEDF1]">
            {rules.filter(r => r.group === group).map(rule => (
              <div key={rule.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-ink">{rule.trigger}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <ArrowRight size={10} className="text-muted-foreground flex-none" />
                    <span className="text-xs text-muted-foreground font-semibold">{rule.action}</span>
                  </div>
                </div>
                <button onClick={() => toggle(rule.id)} className="flex-none">
                  {rule.enabled ? (
                    <ToggleRight size={28} style={{ color: WA }} />
                  ) : (
                    <ToggleLeft size={28} className="text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Settings panel view */
function DashboardSettings({ config, onUpdate }: { config: WhatsAppConfig; onUpdate: (c: Partial<WhatsAppConfig>) => void }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const shoppingLink = `https://wa.me/2348012345678?text=Shop`;

  const togglePayment = (method: PaymentMethod) => {
    const current = config.paymentMethods;
    const next = current.includes(method) ? current.filter(m => m !== method) : [...current, method];
    onUpdate({ paymentMethods: next });
  };

  const toggleFulfilment = (type: FulfilmentType) => {
    const current = config.fulfilmentTypes;
    const next = current.includes(type) ? current.filter(t => t !== type) : [...current, type];
    onUpdate({ fulfilmentTypes: next });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-6 bg-[#F5F6F8]">
      <div>
        <h3 className="text-xl font-extrabold text-ink">WhatsApp Store Settings</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Update your store configuration anytime</p>
      </div>

      {/* Store info */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm space-y-4">
        <h4 className="font-extrabold text-sm text-ink uppercase tracking-wider text-muted-foreground">Store info</h4>
        <Field label="Store name">
          <StyledInput value={config.storeName} onChange={v => onUpdate({ storeName: v })} />
        </Field>
        <Field label="Business phone">
          <StyledInput value={config.storePhone} onChange={v => onUpdate({ storePhone: v })} />
        </Field>
        <Field label="Description">
          <textarea
            value={config.storeDescription}
            onChange={e => onUpdate({ storeDescription: e.target.value })}
            rows={3}
            className="w-full rounded-2xl border border-[#ECEDF1] bg-white p-4 text-sm font-semibold resize-none outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/10 transition-all"
          />
        </Field>
      </div>

      {/* Payments */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#ECEDF1]">
          <h4 className="font-extrabold text-sm text-ink">Payment Methods</h4>
        </div>
        <div className="divide-y divide-[#ECEDF1]">
          {(Object.entries(PAYMENT_LABELS) as [PaymentMethod, string][]).map(([method, label]) => (
            <div key={method} className="flex items-center justify-between px-6 py-4">
              <span className="text-sm font-bold text-ink">{label}</span>
              <button onClick={() => togglePayment(method)}>
                {config.paymentMethods.includes(method) ? (
                  <ToggleRight size={28} style={{ color: WA }} />
                ) : (
                  <ToggleLeft size={28} className="text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fulfilment */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#ECEDF1]">
          <h4 className="font-extrabold text-sm text-ink">Fulfilment Types</h4>
        </div>
        <div className="divide-y divide-[#ECEDF1]">
          {(Object.entries(FULFILMENT_LABELS) as [FulfilmentType, string][]).map(([type, label]) => (
            <div key={type} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{FULFILMENT_ICONS[type]}</span>
                <span className="text-sm font-bold text-ink">{label}</span>
              </div>
              <button onClick={() => toggleFulfilment(type)}>
                {config.fulfilmentTypes.includes(type) ? (
                  <ToggleRight size={28} style={{ color: WA }} />
                ) : (
                  <ToggleLeft size={28} className="text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout type */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#ECEDF1]">
          <h4 className="font-extrabold text-sm text-ink">Checkout Type</h4>
        </div>
        <div className="divide-y divide-[#ECEDF1]">
          {([
            { id: 'relay', label: 'Relay Checkout', desc: 'In-app browser checkout with full cart support' },
            { id: 'whatsapp_assisted', label: 'WhatsApp Assisted', desc: 'Order entirely inside WhatsApp' },
          ] as { id: CheckoutType; label: string; desc: string }[]).map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ checkoutType: opt.id })}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F8F9FB] transition-colors text-left"
            >
              <div>
                <div className="text-sm font-bold text-ink">{opt.label}</div>
                <div className="text-xs text-muted-foreground font-medium">{opt.desc}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-none ${
                config.checkoutType === opt.id ? 'border-ink' : 'border-muted-foreground'
              }`}>
                {config.checkoutType === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-ink" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Link & QR */}
      <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm space-y-4">
        <h4 className="font-extrabold text-sm uppercase text-muted-foreground tracking-wider">
          Shopping link & QR
        </h4>
        <div className="flex items-center gap-3">
          <QRCodeMock size={90} />
          <div className="space-y-2 flex-1 min-w-0">
            <div
              className="h-10 rounded-xl flex items-center gap-2 px-3"
              style={{ background: `${WA}0F`, border: `1px solid ${WA}33` }}
            >
              <MessageCircle size={13} style={{ color: WA }} className="flex-none" />
              <span className="text-xs font-bold truncate" style={{ color: WA_DARK }}>{shoppingLink}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 h-9 rounded-full border border-[#ECEDF1] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-muted transition-colors">
                <Copy size={11} /> Copy
              </button>
              <button className="flex-1 h-9 rounded-full text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity" style={{ background: WA }}>
                <Share2 size={11} /> Share
              </button>
              <button className="flex-1 h-9 rounded-full border border-[#ECEDF1] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-muted transition-colors">
                <QrCode size={11} /> Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-[24px] border border-destructive/20 p-6 shadow-sm">
        <h4 className="font-extrabold text-sm text-destructive mb-3">Danger Zone</h4>
        <button className="flex items-center gap-2 px-5 py-3 rounded-full border border-destructive/30 text-destructive text-sm font-bold hover:bg-destructive/5 transition-colors">
          <WifiOff size={15} /> Disconnect WhatsApp account
        </button>
      </div>

      <div className="sticky bottom-6">
        <button
          onClick={handleSave}
          className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors"
        >
          {saved ? <><Check size={18} style={{ color: WA }} /> Saved!</> : <>Save changes</>}
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard Shell ──────────────────────────────────────────────────────────

function Dashboard({
  config,
  onUpdate,
  onReset,
}: {
  config: WhatsAppConfig;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
  onReset: () => void;
}) {
  const [view, setView] = useState<DashboardView>('overview');

  const NAV_ITEMS: { id: DashboardView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview',   label: 'Overview',   icon: <Activity size={15} /> },
    { id: 'catalogue',  label: 'Catalogue',  icon: <Package size={15} /> },
    { id: 'orders',     label: 'Orders',     icon: <ShoppingBag size={15} /> },
    { id: 'analytics',  label: 'Analytics',  icon: <BarChart2 size={15} /> },
    { id: 'automation', label: 'Automation', icon: <Zap size={15} /> },
    { id: 'settings',   label: 'Settings',   icon: <Settings size={15} /> },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Dashboard nav */}
      <div className="flex-none bg-white border-b px-4 md:px-8">
        <div className="flex gap-1 overflow-x-auto pb-1 pt-3 scrollbar-hide">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap flex-none transition-all ${
                view === item.id
                  ? 'text-white shadow-sm'
                  : 'text-muted-foreground hover:text-ink hover:bg-[#F5F6F8]'
              }`}
              style={view === item.id ? { background: WA } : {}}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* View content */}
      <div className="flex-1 overflow-hidden">
        {view === 'overview'   && <DashboardOverview config={config} />}
        {view === 'catalogue'  && <DashboardCatalogue />}
        {view === 'orders'     && (
          <div className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-4 bg-[#F5F6F8]">
            <div>
              <h3 className="text-xl font-extrabold text-ink">WhatsApp Orders</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Orders received through WhatsApp Shopping</p>
            </div>
            <div className="space-y-3">
              {[...WA_ORDERS, ...WA_ORDERS.map(o => ({ ...o, id: `${o.id}-2`, date: 'Yesterday' }))].map(order => (
                <div key={order.id} className="bg-white rounded-[20px] border border-[#ECEDF1] p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:border-[#ECEDF1]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-none" style={{ background: `${WA}15` }}>
                    <MessageCircle size={20} style={{ color: WA }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-ink">{order.customer}</span>
                      <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{order.id}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold mt-0.5">
                      {order.date} · {order.items} item{order.items !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-sm text-ink">₦{order.amount.toLocaleString()}</div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${ORDER_STAGE_COLORS[order.stage] || 'bg-muted text-muted-foreground'}`}>
                      {order.stage}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground flex-none" />
                </div>
              ))}
            </div>
          </div>
        )}
        {view === 'analytics'  && <DashboardAnalytics />}
        {view === 'automation' && <DashboardAutomation />}
        {view === 'settings'   && <DashboardSettings config={config} onUpdate={onUpdate} />}
      </div>
    </div>
  );
}

// ─── Onboarding Wizard ────────────────────────────────────────────────────────

function OnboardingWizard({
  config,
  onUpdate,
  onComplete,
}: {
  config: WhatsAppConfig;
  onUpdate: (c: Partial<WhatsAppConfig>) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<OnboardingStep>('connect');
  const [published, setPublished] = useState(false);

  const stepIndex = ONBOARDING_STEPS.findIndex(s => s.id === step);
  const completedIds = ONBOARDING_STEPS.slice(0, stepIndex).map(s => s.id);

  const goNext = useCallback(() => {
    const next = ONBOARDING_STEPS[stepIndex + 1];
    if (next) setStep(next.id);
  }, [stepIndex]);

  const goBack = useCallback(() => {
    const prev = ONBOARDING_STEPS[stepIndex - 1];
    if (prev) setStep(prev.id);
  }, [stepIndex]);

  const handlePublish = () => {
    onUpdate({ published: true });
    setPublished(true);
  };

  if (published) {
    return (
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 md:p-12 bg-[#F5F6F8] pb-24">
        <div className="max-w-md w-full space-y-6 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg"
            style={{ background: WA }}
          >
            <Check size={36} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Your WhatsApp Store is Live! 🎉</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Customers can now browse your catalogue, add to cart, and pay — all through WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#ECEDF1] p-6 shadow-sm text-left space-y-4">
            <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
              Share your store
            </div>
            <div className="flex items-center gap-3">
              <QRCodeMock size={80} />
              <div className="flex-1 space-y-2">
                <div className="h-10 rounded-xl flex items-center gap-2 px-3" style={{ background: `${WA}0F`, border: `1px solid ${WA}33` }}>
                  <MessageCircle size={12} style={{ color: WA }} className="flex-none" />
                  <span className="text-xs font-bold truncate" style={{ color: WA_DARK }}>wa.me/2348012345678?text=Shop</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 h-9 rounded-full border border-[#ECEDF1] text-xs font-bold flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                    <Copy size={11} /> Copy
                  </button>
                  <button className="flex-1 h-9 rounded-full text-xs font-bold text-white flex items-center justify-center gap-1 hover:opacity-90" style={{ background: WA }}>
                    <Share2 size={11} /> Share
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mt-4">
              Share to social
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: 'WhatsApp', color: WA },
                { label: 'Instagram', color: '#E1306C' },
                { label: 'Facebook', color: '#1877F2' },
                { label: 'TikTok', color: '#000' },
              ].map(s => (
                <button
                  key={s.label}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ background: s.color }}
                >
                  <Share2 size={11} /> {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors"
          >
            Go to WhatsApp Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Wizard step progress */}
      <div className="flex-none px-4 md:px-10 pt-5 pb-4 bg-white border-b">
        <StepProgress
          steps={ONBOARDING_STEPS}
          currentId={step}
          completedIds={completedIds}
          onGoTo={id => setStep(id as OnboardingStep)}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {step === 'connect'   && <StepConnect config={config} onNext={goNext} onUpdate={onUpdate} />}
        {step === 'configure' && <StepConfigure config={config} onNext={goNext} onBack={goBack} onUpdate={onUpdate} />}
        {step === 'catalogue' && <StepCatalogue config={config} onNext={goNext} onBack={goBack} onUpdate={onUpdate} />}
        {step === 'shopping'  && <StepShopping config={config} onNext={goNext} onBack={goBack} onUpdate={onUpdate} />}
        {step === 'payments'  && <StepPayments config={config} onNext={goNext} onBack={goBack} onUpdate={onUpdate} />}
        {step === 'checkout'  && <StepCheckout config={config} onNext={goNext} onBack={goBack} onUpdate={onUpdate} />}
        {step === 'publish'   && <StepPublish config={config} onPublish={handlePublish} onBack={goBack} />}
      </div>
    </div>
  );
}

// ─── Default config ───────────────────────────────────────────────────────────

const DEFAULT_CONFIG: WhatsAppConfig = {
  connected: false,
  phoneNumber: '',
  displayName: '',
  verified: false,
  storeName: "Amara's Kitchen",
  storeDescription: 'Home-cooked meals made with love. Jollof, Egusi, Grills & more.',
  storePhone: '+234 801 234 5678',
  catalogueSyncMode: 'all',
  fulfilmentTypes: ['delivery', 'pickup'],
  paymentMethods: ['paystack', 'bank_transfer'],
  checkoutType: 'relay',
  published: false,
};

// ─── Main WhatsApp Shopping Component ────────────────────────────────────────

/**
 * WhatsApp Shopping System
 *
 * Entry states:
 *  - If never configured → show onboarding wizard (7 steps)
 *  - If configured → show full dashboard
 */
export default function WhatsAppShopping() {
  const [config, setConfig] = useState<WhatsAppConfig>(DEFAULT_CONFIG);
  const [setupComplete, setSetupComplete] = useState(false);

  const updateConfig = useCallback((partial: Partial<WhatsAppConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
  }, []);

  const handleSetupComplete = useCallback(() => {
    setSetupComplete(true);
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setSetupComplete(false);
  }, []);

  if (!setupComplete) {
    return (
      <OnboardingWizard
        config={config}
        onUpdate={updateConfig}
        onComplete={handleSetupComplete}
      />
    );
  }

  return (
    <Dashboard
      config={config}
      onUpdate={updateConfig}
      onReset={handleReset}
    />
  );
}
