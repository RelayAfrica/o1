import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  CreditCard,
  Download,
  Eye,
  FileText,
  Gift,
  MapPin,
  MessageCircle,
  Package,
  Pencil,
  QrCode,
  RefreshCw,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  ToggleLeft,
  ToggleRight,
  Truck,
  UtensilsCrossed,
  Wallet,
  Zap,
} from 'lucide-react';

const WA = '#25D366';
const WA_DARK = '#128C7E';
const SURFACE = '#F7F7FB';

type SectionKey = 'overview' | 'setup' | 'catalogue' | 'shopping' | 'checkout' | 'payments' | 'automations' | 'templates' | 'analytics' | 'settings';
type SetupStep = 'connect' | 'business' | 'options' | 'publish';

type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Live' | 'Hidden' | 'Low stock';
  sync: 'Synced' | 'Pending';
  image: string;
};

type CheckoutMode = 'delivery' | 'pickup' | 'dineIn' | 'appointments';

type AutomationItem = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

const sections: { id: SectionKey; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <Store size={15} /> },
  { id: 'setup', label: 'Setup', icon: <Sparkles size={15} /> },
  { id: 'catalogue', label: 'Catalogue', icon: <Package size={15} /> },
  { id: 'shopping', label: 'Shopping Experience', icon: <ShoppingBag size={15} /> },
  { id: 'checkout', label: 'Checkout', icon: <CreditCard size={15} /> },
  { id: 'payments', label: 'Payments', icon: <Wallet size={15} /> },
  { id: 'automations', label: 'Automations', icon: <Zap size={15} /> },
  { id: 'templates', label: 'Templates', icon: <FileText size={15} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={15} /> },
  { id: 'settings', label: 'Settings', icon: <Settings2 size={15} /> },
];

const overviewMetrics = [
  { label: 'WhatsApp Connected', value: 'Yes', hint: 'Live and verified' },
  { label: 'Catalogue Status', value: 'Healthy', hint: '4 products synced' },
  { label: 'Products Available', value: '24', hint: '3 featured' },
  { label: 'Orders Today', value: '12', hint: '+3 vs yesterday' },
  { label: 'Revenue Today', value: '₦84k', hint: '12 completed' },
  { label: 'Checkout Enabled', value: 'On', hint: 'Delivery + pickup' },
];

const progressSteps = [
  { id: 'connect', label: 'Connect WhatsApp', done: true },
  { id: 'products', label: 'Add Products', done: true },
  { id: 'checkout', label: 'Configure Checkout', done: true },
  { id: 'payments', label: 'Configure Payments', done: false },
  { id: 'publish', label: 'Publish Store', done: false },
];

const products: ProductRow[] = [
  { id: 'P1', name: 'Jollof Rice Combo', category: 'Food', price: 4500, stock: 45, status: 'Live', sync: 'Synced', image: '🍽️' },
  { id: 'P2', name: 'Grilled Chicken', category: 'Food', price: 3000, stock: 12, status: 'Live', sync: 'Pending', image: '🍗' },
  { id: 'P3', name: 'Fresh Garden Salad', category: 'Food', price: 2500, stock: 30, status: 'Low stock', sync: 'Synced', image: '🥗' },
  { id: 'P4', name: 'Chilled Iced Tea', category: 'Drinks', price: 1200, stock: 0, status: 'Hidden', sync: 'Pending', image: '🥤' },
];

const paymentProviders = [
  { id: 'paystack', name: 'Paystack', description: 'Cards, bank transfer, and USSD', status: 'Connected' },
  { id: 'flutterwave', name: 'Flutterwave', description: 'Flexible checkout for local payments', status: 'Ready' },
  { id: 'bank', name: 'Bank Transfer', description: 'Manual confirmation for larger orders', status: 'Ready' },
  { id: 'cash', name: 'Cash', description: 'Great for pickup and dine-in', status: 'Enabled' },
];

const initialAutomations: AutomationItem[] = [
  { id: 'order', title: 'When an order is received', description: 'Send a confirmation message right away', enabled: true },
  { id: 'payment', title: 'When payment succeeds', description: 'Mark order paid and notify the customer', enabled: true },
  { id: 'ready', title: 'When the order is ready', description: 'Send a pickup or delivery update', enabled: true },
  { id: 'review', title: 'When the order is delivered', description: 'Ask for a quick review and feedback', enabled: false },
];

const templateCategories = ['Orders', 'Payments', 'Delivery', 'Appointments', 'Marketing'];

const templateItems = [
  { id: 'confirm', name: 'Order confirmation', category: 'Orders', language: 'English', updated: '2h ago', status: 'Live' },
  { id: 'payment', name: 'Payment reminder', category: 'Payments', language: 'English', updated: 'Yesterday', status: 'Draft' },
  { id: 'delivery', name: 'Delivery update', category: 'Delivery', language: 'English', updated: '3 days ago', status: 'Live' },
];

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[24px] border border-[#E9EAF1] bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-[22px] border border-[#E9EAF1] bg-white p-4 shadow-sm">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">{label}</p>
      <p className="mt-3 text-2xl font-extrabold text-[#16213E]">{value}</p>
      {hint && <p className="mt-1 text-sm font-semibold text-[#6B7280]">{hint}</p>}
    </div>
  );
}

function ToggleRow({ title, description, enabled, onToggle }: { title: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3">
      <div>
        <p className="font-bold text-[#16213E]">{title}</p>
        <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
      </div>
      <button onClick={onToggle} className="flex-none">
        {enabled ? <ToggleRight size={28} color={WA} /> : <ToggleLeft size={28} className="text-[#8A8F98]" />}
      </button>
    </div>
  );
}

function PreviewPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[30px] border border-[#E9EAF1] bg-[#ECE5DD] p-2 shadow-[0_18px_40px_rgba(22,33,62,0.16)]">
      <div className="rounded-[24px] border border-white/70 bg-white p-3">
        <div className="mb-3 flex items-center justify-between rounded-full bg-[#16213E] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
          <span>Relay</span>
          <span className="rounded-full bg-[#25D366] px-2 py-0.5 text-[9px]">Live</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function WhatsAppShoppingExperience() {
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');
  const [setupStep, setSetupStep] = useState<SetupStep>('connect');
  const [connected, setConnected] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("Amara's Kitchen");
  const [businessPhone, setBusinessPhone] = useState('+234 801 234 5678');
  const [description, setDescription] = useState('Fresh bowls, family meals, and quick delivery.');
  const [logoText, setLogoText] = useState('AK');
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [dineInEnabled, setDineInEnabled] = useState(false);
  const [appointmentsEnabled, setAppointmentsEnabled] = useState(false);
  const [shoppingEnabled, setShoppingEnabled] = useState(true);
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [categoriesEnabled, setCategoriesEnabled] = useState(true);
  const [featuredEnabled, setFeaturedEnabled] = useState(true);
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(true);
  const [reviewsEnabled, setReviewsEnabled] = useState(true);
  const [badgesEnabled, setBadgesEnabled] = useState(true);
  const [automations, setAutomations] = useState(initialAutomations);
  const [selectedTemplate, setSelectedTemplate] = useState(templateItems[0].id);
  const [selectedCategory, setSelectedCategory] = useState(templateCategories[0]);

  const selectedTemplateData = useMemo(() => templateItems.find((item) => item.id === selectedTemplate) || templateItems[0], [selectedTemplate]);

  const handleAction = (label: string) => {
    setToast(label);
    window.setTimeout(() => setToast(null), 1600);
  };

  const toggleAutomation = (id: string) => {
    setAutomations((prev) => prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <SectionCard>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#25D366]">WhatsApp Shopping</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#16213E]">Your simple commerce hub</h2>
                  <p className="mt-2 max-w-2xl text-sm text-[#6B7280]">Keep the store, catalogue, orders, and messages in one calm workspace designed for everyday business owners.</p>
                </div>
                <button onClick={() => handleAction('Store published')} className="rounded-full bg-[#16213E] px-4 py-2.5 text-sm font-bold text-white">
                  Publish store
                </button>
              </div>
            </SectionCard>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {overviewMetrics.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <SectionCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Complete your setup</p>
                    <h3 className="mt-2 text-xl font-extrabold text-[#16213E]">A few steps to get started</h3>
                  </div>
                  <div className="rounded-full bg-[#25D366]/12 px-3 py-1 text-sm font-bold text-[#128C7E]">75%</div>
                </div>
                <div className="mt-5 space-y-3">
                  {progressSteps.map((step) => (
                    <div key={step.label} className="flex items-center justify-between rounded-[18px] border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${step.done ? 'bg-[#25D366]/15 text-[#128C7E]' : 'bg-[#F3F4F6] text-[#8A8F98]'}`}>
                          {step.done ? <Check size={14} /> : <Clock3 size={14} />}
                        </div>
                        <span className="text-sm font-semibold text-[#16213E]">{step.label}</span>
                      </div>
                      {step.done ? <BadgeCheck size={18} className="text-[#25D366]" /> : <ChevronRight size={16} className="text-[#8A8F98]" />}
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">What customers see</p>
                <div className="mt-4 flex justify-center">
                  <PreviewPhone>
                    <div className="space-y-2">
                      <div className="rounded-[16px] border border-[#E9EAF1] bg-[#F9FAFC] p-3">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Popular today</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#16213E]">Jollof Rice Combo</p>
                            <p className="text-sm text-[#6B7280]">₦4,500</p>
                          </div>
                          <div className="rounded-full bg-[#25D366]/15 px-2.5 py-1 text-[11px] font-bold text-[#128C7E]">Best seller</div>
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-[#E9EAF1] bg-[#F9FAFC] p-3">
                        <p className="font-bold text-[#16213E]">Ready for pickup</p>
                        <p className="text-sm text-[#6B7280]">We’ll send you an update as soon as it’s prepared.</p>
                      </div>
                    </div>
                  </PreviewPhone>
                </div>
              </SectionCard>
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <SectionCard>
                <div className="flex flex-wrap gap-2">
                  {(['connect', 'business', 'options', 'publish'] as SetupStep[]).map((step) => {
                    const active = setupStep === step;
                    return (
                      <button key={step} onClick={() => setSetupStep(step)} className={`rounded-full px-3.5 py-2 text-sm font-bold ${active ? 'bg-[#16213E] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                        {step === 'connect' ? 'Connect' : step === 'business' ? 'Business' : step === 'options' ? 'Options' : 'Publish'}
                      </button>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard>
                {setupStep === 'connect' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <MessageCircle size={22} />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#16213E]">Connect WhatsApp</h3>
                        <p className="text-sm text-[#6B7280]">Customers can message your business and browse your catalogue.</p>
                      </div>
                    </div>
                    <div className="rounded-[24px] bg-[#F4F9F5] p-5 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <MessageCircle size={32} />
                      </div>
                      <p className="mt-4 text-lg font-extrabold text-[#16213E]">Everything stays simple for your team</p>
                      <p className="mt-2 text-sm text-[#6B7280]">You only need to connect your WhatsApp account once. Relay takes care of the rest.</p>
                    </div>
                    <button onClick={() => { setConnected(true); handleAction('WhatsApp connected'); setSetupStep('business'); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-extrabold text-white">
                      Connect WhatsApp <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {setupStep === 'business' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-extrabold text-[#16213E]">Business information</h3>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-[#16213E]">
                        Business name
                        <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                      </label>
                      <label className="block text-sm font-semibold text-[#16213E]">
                        Business phone
                        <input value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                      </label>
                      <label className="block text-sm font-semibold text-[#16213E]">
                        Store description
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                      </label>
                      <label className="block text-sm font-semibold text-[#16213E]">
                        Business logo
                        <input value={logoText} onChange={(e) => setLogoText(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                      </label>
                    </div>
                    <button onClick={() => { handleAction('Business details saved'); setSetupStep('options'); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#16213E] px-4 py-3.5 text-sm font-extrabold text-white">
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {setupStep === 'options' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-extrabold text-[#16213E]">Store options</h3>
                    <div className="space-y-3">
                      <ToggleRow title="Delivery" description="Customers can order for doorstep delivery" enabled={deliveryEnabled} onToggle={() => setDeliveryEnabled((v) => !v)} />
                      <ToggleRow title="Pickup" description="Customers can collect from your location" enabled={pickupEnabled} onToggle={() => setPickupEnabled((v) => !v)} />
                      <ToggleRow title="Dine-In" description="Ideal for restaurants and cafés" enabled={dineInEnabled} onToggle={() => setDineInEnabled((v) => !v)} />
                      <ToggleRow title="Appointment Booking" description="Accept bookings directly from chat" enabled={appointmentsEnabled} onToggle={() => setAppointmentsEnabled((v) => !v)} />
                    </div>
                    <button onClick={() => { handleAction('Store options saved'); setSetupStep('publish'); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-extrabold text-white">
                      Review and publish <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {setupStep === 'publish' && (
                  <div className="space-y-4">
                    <div className="rounded-[24px] bg-[#F4F9F5] p-5 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <Check size={26} />
                      </div>
                      <h3 className="mt-4 text-xl font-extrabold text-[#16213E]">Your store is ready</h3>
                      <p className="mt-2 text-sm text-[#6B7280]">Share the link or QR code to start taking orders from WhatsApp.</p>
                    </div>
                    <div className="rounded-[18px] border border-[#E9EAF1] bg-[#FBFCFE] p-4">
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">WhatsApp link</div>
                      <p className="mt-2 break-all text-sm font-bold text-[#128C7E]">wa.me/2348012345678?text=Shop</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleAction('Link copied')} className="flex items-center gap-2 rounded-full border border-[#E9EAF1] bg-white px-4 py-2.5 text-sm font-bold text-[#16213E]">
                        <Copy size={14} /> Copy link
                      </button>
                      <button onClick={() => handleAction('QR download started')} className="flex items-center gap-2 rounded-full border border-[#E9EAF1] bg-white px-4 py-2.5 text-sm font-bold text-[#16213E]">
                        <Download size={14} /> Download QR
                      </button>
                      <button onClick={() => handleAction('Shared')} className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white">
                        <Share2 size={14} /> Share
                      </button>
                    </div>
                  </div>
                )}
              </SectionCard>
            </div>

            <div className="space-y-4">
              <SectionCard>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Live preview</p>
                <div className="mt-4 flex justify-center">
                  <PreviewPhone>
                    <div className="space-y-2">
                      <div className="rounded-[16px] bg-[#F7F7FB] p-3">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Now open</p>
                        <p className="mt-1 font-extrabold text-[#16213E]">{businessName}</p>
                        <p className="text-sm text-[#6B7280]">{description}</p>
                      </div>
                      <div className="rounded-[16px] border border-[#E9EAF1] bg-white p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-[#16213E]">Today’s menu</p>
                          <span className="rounded-full bg-[#25D366]/12 px-2 py-1 text-[10px] font-bold text-[#128C7E]">Fresh</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 rounded-[14px] bg-[#F9FAFC] p-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#25D366]/12 text-lg">🍽️</div>
                          <div>
                            <p className="text-sm font-bold text-[#16213E]">Jollof Rice Combo</p>
                            <p className="text-xs text-[#6B7280]">₦4,500 · Ready in 20 min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PreviewPhone>
                </div>
              </SectionCard>
              {connected && (
                <SectionCard>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Status</p>
                  <div className="mt-3 flex items-center gap-3 rounded-[18px] bg-[#F4F9F5] p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
                      <BadgeCheck size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#16213E]">Connected and ready</p>
                      <p className="text-sm text-[#6B7280]">Customers will see your store instantly.</p>
                    </div>
                  </div>
                </SectionCard>
              )}
            </div>
          </div>
        );

      case 'catalogue':
        return (
          <div className="space-y-6">
            <SectionCard>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#25D366]">Catalogue</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-[#16213E]">Relay products become your WhatsApp catalogue</h3>
                  <p className="mt-2 text-sm text-[#6B7280]">Keep this simple. Each product becomes a friendly item customers can browse in WhatsApp.</p>
                </div>
                <button onClick={() => handleAction('Sync started')} className="rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white">
                  Sync catalogue
                </button>
              </div>
            </SectionCard>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <MetricCard label="Total products" value="24" hint="In active store" />
              <MetricCard label="Categories" value="6" hint="Organised for browsing" />
              <MetricCard label="Featured" value="3" hint="Pinned at the top" />
              <MetricCard label="Out of stock" value="2" hint="Need attention" />
              <MetricCard label="Recently updated" value="4" hint="Changed this week" />
            </div>

            <SectionCard>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E9EAF1] text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">
                      <th className="pb-3 pr-3">Image</th>
                      <th className="pb-3 pr-3">Product</th>
                      <th className="pb-3 pr-3">Category</th>
                      <th className="pb-3 pr-3">Price</th>
                      <th className="pb-3 pr-3">Stock</th>
                      <th className="pb-3 pr-3">Status</th>
                      <th className="pb-3 pr-3">Sync</th>
                      <th className="pb-3 pr-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-[#F2F4F8] last:border-0">
                        <td className="py-3 pr-3 text-lg">{product.image}</td>
                        <td className="py-3 pr-3 font-bold text-[#16213E]">{product.name}</td>
                        <td className="py-3 pr-3 text-[#6B7280]">{product.category}</td>
                        <td className="py-3 pr-3 text-[#16213E]">₦{product.price.toLocaleString()}</td>
                        <td className="py-3 pr-3 text-[#16213E]">{product.stock}</td>
                        <td className="py-3 pr-3">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${product.status === 'Live' ? 'bg-[#25D366]/12 text-[#128C7E]' : product.status === 'Low stock' ? 'bg-[#F59E0B]/12 text-[#B45309]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>{product.status}</span>
                        </td>
                        <td className="py-3 pr-3">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${product.sync === 'Synced' ? 'bg-[#25D366]/12 text-[#128C7E]' : 'bg-[#FDE68A]/20 text-[#92400E]'}`}>{product.sync}</span>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleAction('Sync requested')} className="rounded-full border border-[#E9EAF1] px-2.5 py-1 text-[11px] font-bold text-[#16213E]">Sync</button>
                            <button onClick={() => handleAction('Preview opened')} className="rounded-full border border-[#E9EAF1] px-2.5 py-1 text-[11px] font-bold text-[#16213E]">Preview</button>
                            <button onClick={() => handleAction('Edit opened')} className="rounded-full border border-[#E9EAF1] px-2.5 py-1 text-[11px] font-bold text-[#16213E]">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>
        );

      case 'shopping':
        return (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <SectionCard>
                <h3 className="text-xl font-extrabold text-[#16213E]">Shopping experience</h3>
                <p className="mt-2 text-sm text-[#6B7280]">Choose the shopping bits that help customers browse and order with confidence.</p>
              </SectionCard>
              <SectionCard>
                <div className="space-y-3">
                  <ToggleRow title="Shopping enabled" description="Customers can browse your menu and place orders" enabled={shoppingEnabled} onToggle={() => setShoppingEnabled((v) => !v)} />
                  <ToggleRow title="Product search" description="Customer can quickly find an item" enabled={searchEnabled} onToggle={() => setSearchEnabled((v) => !v)} />
                  <ToggleRow title="Category navigation" description="Browse by category in the chat flow" enabled={categoriesEnabled} onToggle={() => setCategoriesEnabled((v) => !v)} />
                  <ToggleRow title="Featured products" description="Highlight your best sellers first" enabled={featuredEnabled} onToggle={() => setFeaturedEnabled((v) => !v)} />
                  <ToggleRow title="Recommendations" description="Show related items after browsing" enabled={recommendationsEnabled} onToggle={() => setRecommendationsEnabled((v) => !v)} />
                  <ToggleRow title="Product reviews" description="Display recent customer feedback" enabled={reviewsEnabled} onToggle={() => setReviewsEnabled((v) => !v)} />
                  <ToggleRow title="Product badges" description="Show Best Seller, New, and Limited Offer" enabled={badgesEnabled} onToggle={() => setBadgesEnabled((v) => !v)} />
                </div>
              </SectionCard>
            </div>

            <SectionCard>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Mobile preview</p>
              <div className="mt-4 flex justify-center">
                <PreviewPhone>
                  <div className="space-y-2">
                    <div className="rounded-[16px] bg-[#F7F7FB] p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-extrabold text-[#16213E]">Browse</p>
                        {searchEnabled && <Search size={14} className="text-[#25D366]" />}
                      </div>
                      {categoriesEnabled && (
                        <div className="mt-2 flex gap-2">
                          {['Food', 'Drinks', 'Specials'].map((item) => (
                            <span key={item} className="rounded-full bg-[#16213E] px-2.5 py-1 text-[10px] font-bold text-white">{item}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="rounded-[16px] border border-[#E9EAF1] bg-white p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#16213E]">Jollof Rice Combo</p>
                        {badgesEnabled && <span className="rounded-full bg-[#25D366]/12 px-2 py-1 text-[10px] font-bold text-[#128C7E]">Best seller</span>}
                      </div>
                      <p className="mt-1 text-sm text-[#6B7280]">₦4,500 · Ready in 20 min</p>
                      {recommendationsEnabled && <p className="mt-2 text-xs font-semibold text-[#128C7E]">Recommended with iced tea</p>}
                    </div>
                  </div>
                </PreviewPhone>
              </div>
            </SectionCard>
          </div>
        );

      case 'checkout':
        return (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <SectionCard>
                <h3 className="text-xl font-extrabold text-[#16213E]">Checkout options</h3>
                <p className="mt-2 text-sm text-[#6B7280]">Choose how order details are collected for each buying flow.</p>
              </SectionCard>
              {[
                { id: 'delivery' as CheckoutMode, title: 'Delivery', description: 'Doorstep delivery with a clear ETA', enabled: deliveryEnabled, fields: 'Name, address, phone', time: '25-35 min', message: 'We will keep you updated.' },
                { id: 'pickup' as CheckoutMode, title: 'Pickup', description: 'Fast collection for local customers', enabled: pickupEnabled, fields: 'Name, phone', time: '10-15 min', message: 'Your order is ready for pickup.' },
                { id: 'dineIn' as CheckoutMode, title: 'Dine-In', description: 'Ideal for cafés and restaurants', enabled: dineInEnabled, fields: 'Name, table number', time: '12-18 min', message: 'We will bring your food to your table.' },
                { id: 'appointments' as CheckoutMode, title: 'Appointments', description: 'Good for bookings and service-based orders', enabled: appointmentsEnabled, fields: 'Name, date, service', time: '24h notice', message: 'Thanks for booking with us.' },
              ].map((item) => (
                <SectionCard key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-[#16213E]">{item.title}</p>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.enabled ? 'bg-[#25D366]/12 text-[#128C7E]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>{item.enabled ? 'Enabled' : 'Off'}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
                    </div>
                    <button onClick={() => handleAction(`${item.title} updated`)} className="rounded-full border border-[#E9EAF1] px-3 py-1.5 text-xs font-bold text-[#16213E]">Edit</button>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[16px] bg-[#FBFCFE] p-3">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Required fields</p>
                      <p className="mt-2 text-sm font-semibold text-[#16213E]">{item.fields}</p>
                    </div>
                    <div className="rounded-[16px] bg-[#FBFCFE] p-3">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Estimated time</p>
                      <p className="mt-2 text-sm font-semibold text-[#16213E]">{item.time}</p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-[16px] border border-[#E9EAF1] bg-[#F9FAFC] p-3">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Confirmation message</p>
                    <p className="mt-2 text-sm font-semibold text-[#16213E]">{item.message}</p>
                  </div>
                </SectionCard>
              ))}
            </div>

            <SectionCard>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Preview</p>
              <div className="mt-4 flex justify-center">
                <PreviewPhone>
                  <div className="space-y-2">
                    <div className="rounded-[16px] bg-[#F7F7FB] p-3">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Checkout summary</p>
                      <p className="mt-2 font-extrabold text-[#16213E]">1 x Jollof Rice Combo</p>
                      <p className="mt-1 text-sm text-[#6B7280]">Delivery · 25-35 min</p>
                    </div>
                    <div className="rounded-[16px] border border-[#E9EAF1] bg-white p-3">
                      <p className="font-bold text-[#16213E]">We’ll confirm your order</p>
                      <p className="mt-1 text-sm text-[#6B7280]">Thanks for ordering from Amara’s Kitchen.</p>
                    </div>
                  </div>
                </PreviewPhone>
              </div>
            </SectionCard>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-4">
            <SectionCard>
              <h3 className="text-xl font-extrabold text-[#16213E]">Payments</h3>
              <p className="mt-2 text-sm text-[#6B7280]">Choose how customers pay, then connect the option that makes sense for your business.</p>
            </SectionCard>
            <div className="grid gap-4 md:grid-cols-2">
              {paymentProviders.map((provider) => (
                <SectionCard key={provider.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-[#16213E]">{provider.name}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{provider.description}</p>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-[11px] font-bold ${provider.status === 'Connected' ? 'bg-[#25D366]/12 text-[#128C7E]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>{provider.status}</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => handleAction(`${provider.name} selected`)} className="flex-1 rounded-full bg-[#16213E] px-4 py-2.5 text-sm font-bold text-white">Connect</button>
                    <button onClick={() => handleAction(`${provider.name} settings opened`)} className="flex-1 rounded-full border border-[#E9EAF1] px-4 py-2.5 text-sm font-bold text-[#16213E]">Settings</button>
                  </div>
                </SectionCard>
              ))}
            </div>
          </div>
        );

      case 'automations':
        return (
          <div className="space-y-4">
            <SectionCard>
              <h3 className="text-xl font-extrabold text-[#16213E]">Automations</h3>
              <p className="mt-2 text-sm text-[#6B7280]">Simple, human-friendly rules that help you stay on top of orders without extra effort.</p>
            </SectionCard>
            {automations.map((item) => (
              <SectionCard key={item.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-extrabold text-[#16213E]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleAction(`${item.title} preview opened`)} className="rounded-full border border-[#E9EAF1] px-3 py-2 text-sm font-bold text-[#16213E]">Preview</button>
                    <button onClick={() => handleAction(`${item.title} edited`)} className="rounded-full border border-[#E9EAF1] px-3 py-2 text-sm font-bold text-[#16213E]">Edit</button>
                    <button onClick={() => toggleAutomation(item.id)} className="flex-none">
                      {item.enabled ? <ToggleRight size={28} color={WA} /> : <ToggleLeft size={28} className="text-[#8A8F98]" />}
                    </button>
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        );

      case 'templates':
        return (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4">
              <SectionCard>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#16213E]">Templates</h3>
                    <p className="mt-2 text-sm text-[#6B7280]">Prepare the right messages for orders, payments, and updates.</p>
                  </div>
                  <button onClick={() => handleAction('New template created')} className="rounded-full bg-[#16213E] px-4 py-2.5 text-sm font-bold text-white">New template</button>
                </div>
              </SectionCard>
              <div className="flex flex-wrap gap-2">
                {templateCategories.map((category) => (
                  <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-3.5 py-2 text-sm font-bold ${selectedCategory === category ? 'bg-[#16213E] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                    {category}
                  </button>
                ))}
              </div>
              {templateItems.filter((item) => selectedCategory === 'Marketing' || item.category === selectedCategory).map((item) => (
                <SectionCard key={item.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-[#16213E]">{item.name}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{item.category} · {item.language} · Updated {item.updated}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${item.status === 'Live' ? 'bg-[#25D366]/12 text-[#128C7E]' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>{item.status}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => { setSelectedTemplate(item.id); handleAction('Preview opened'); }} className="rounded-full border border-[#E9EAF1] px-3 py-2 text-sm font-bold text-[#16213E]">Preview</button>
                    <button onClick={() => handleAction('Template edited')} className="rounded-full border border-[#E9EAF1] px-3 py-2 text-sm font-bold text-[#16213E]">Edit</button>
                    <button onClick={() => handleAction('Template duplicated')} className="rounded-full border border-[#E9EAF1] px-3 py-2 text-sm font-bold text-[#16213E]">Duplicate</button>
                  </div>
                </SectionCard>
              ))}
            </div>

            <SectionCard>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Template editor</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-[18px] border border-[#E9EAF1] bg-[#FBFCFE] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-[#16213E]">{selectedTemplateData.name}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{selectedTemplateData.category} · {selectedTemplateData.language}</p>
                    </div>
                    <span className="rounded-full bg-[#25D366]/12 px-2.5 py-1 text-[11px] font-bold text-[#128C7E]">{selectedTemplateData.status}</span>
                  </div>
                </div>
                <div className="rounded-[18px] border border-[#E9EAF1] bg-[#FBFCFE] p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Message</p>
                  <p className="mt-2 text-sm font-semibold text-[#16213E]">Hi {businessName.split(' ')[0]}, your order is on the way. We’ll share updates here.</p>
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Variables</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Customer Name', 'Order Number', 'Tracking Link', 'Business Name', 'Order Total', 'Delivery Address'].map((variable) => (
                      <span key={variable} className="rounded-full border border-[#E9EAF1] bg-[#F9FAFC] px-3 py-1.5 text-sm font-semibold text-[#16213E]">{variable}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[18px] border border-[#E9EAF1] bg-[#F7F7FB] p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Live preview</p>
                  <div className="mt-3 rounded-[18px] bg-white p-3 shadow-sm">
                    <p className="font-extrabold text-[#16213E]">Hello {businessName.split(' ')[0]} 👋</p>
                    <p className="mt-1 text-sm text-[#6B7280]">Your order has been confirmed and is on the way.</p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <SectionCard>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#16213E]">Analytics</h3>
                  <p className="mt-2 text-sm text-[#6B7280]">A simple view of orders, revenue, and what customers browse most.</p>
                </div>
                <div className="rounded-full border border-[#E9EAF1] bg-[#FBFCFE] px-3 py-2 text-sm font-semibold text-[#6B7280]">Last 30 days</div>
              </div>
            </SectionCard>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Orders" value="48" hint="+12 this week" />
              <MetricCard label="Revenue" value="₦312k" hint="+18% compared to last month" />
              <MetricCard label="Catalogue views" value="1.24k" hint="Steady traffic" />
              <MetricCard label="Conversion rate" value="3.9%" hint="Healthy for chat commerce" />
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <SectionCard>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Orders over time</p>
                <div className="mt-5 flex h-44 items-end gap-2">
                  {[34, 56, 48, 74, 61, 89, 72].map((height, idx) => (
                    <div key={idx} className="flex-1 rounded-t-[14px] bg-gradient-to-t from-[#128C7E] to-[#25D366]" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </SectionCard>
              <SectionCard>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8A8F98]">Best sellers</p>
                <div className="mt-4 space-y-3">
                  {['Jollof Rice Combo', 'Grilled Chicken', 'Fresh Garden Salad'].map((item, idx) => (
                    <div key={item} className="flex items-center justify-between rounded-[16px] bg-[#FBFCFE] px-3 py-3">
                      <div>
                        <p className="font-bold text-[#16213E]">{item}</p>
                        <p className="text-sm text-[#6B7280]">{idx + 1 === 1 ? '22 orders' : idx + 1 === 2 ? '18 orders' : '8 orders'}</p>
                      </div>
                      <div className="rounded-full bg-[#25D366]/12 px-2.5 py-1 text-[11px] font-bold text-[#128C7E]">Trending</div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <SectionCard>
              <h3 className="text-xl font-extrabold text-[#16213E]">Settings</h3>
              <p className="mt-2 text-sm text-[#6B7280]">Keep the store visible and easy to order from while you grow.</p>
            </SectionCard>
            <SectionCard>
              <div className="space-y-3">
                <ToggleRow title="Shopping enabled" description="Let customers browse and buy from WhatsApp" enabled={shoppingEnabled} onToggle={() => setShoppingEnabled((v) => !v)} />
                <ToggleRow title="Store visible" description="Your store is open to new customers" enabled={true} onToggle={() => handleAction('Store visibility updated')} />
                <ToggleRow title="Accept orders" description="Turn on new orders for the day" enabled={true} onToggle={() => handleAction('Order acceptance updated')} />
                <ToggleRow title="Holiday mode" description="Pause sales while on break" enabled={false} onToggle={() => handleAction('Holiday mode updated')} />
              </div>
            </SectionCard>
            <SectionCard>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#16213E]">
                  Default confirmation message
                  <textarea rows={3} defaultValue="Thanks for ordering from us. We will send updates here." className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                </label>
                <label className="block text-sm font-semibold text-[#16213E]">
                  Default delivery time
                  <input defaultValue="25-35 minutes" className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                </label>
                <label className="block text-sm font-semibold text-[#16213E]">
                  Business hours
                  <input defaultValue="Mon-Sun · 8am - 10pm" className="mt-2 w-full rounded-2xl border border-[#E9EAF1] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-[#25D366]" />
                </label>
              </div>
            </SectionCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F7F7FB]">
      <div className="border-b border-[#E9EAF1] bg-white/90 px-4 py-4 md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#25D366]">Storefront</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#16213E]">WhatsApp Shopping</h2>
            <p className="mt-1 text-sm text-[#6B7280]">A simple, friendly storefront for browsing, ordering, and messaging.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#E9EAF1] bg-[#FBFCFE] px-3 py-2 text-sm font-semibold text-[#16213E]">
            <MessageCircle size={15} className="text-[#25D366]" />
            Connected · Ready to sell
          </div>
        </div>
      </div>

      <div className="flex-none border-b border-[#E9EAF1] bg-white px-4 py-3 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((section) => (
            <button key={section.id} onClick={() => setActiveSection(section.id)} className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${activeSection === section.id ? 'bg-[#16213E] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl space-y-4">
          {toast && (
            <div className="rounded-[16px] border border-[#D1FAE5] bg-[#ECFDF3] px-4 py-3 text-sm font-semibold text-[#166534]">
              {toast}
            </div>
          )}
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
