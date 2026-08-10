import React, { useState } from 'react';
import {
  Settings, HelpCircle, CreditCard, ChevronRight, BarChart2, Store, LogOut,
  Bell, FileText, X, ChevronLeft, Check, Save, TrendingUp, TrendingDown,
  Users, ShoppingBag, Star, Eye, Copy, RefreshCw, Plus, Trash2, Globe,
  Phone, MapPin, Clock, Mail, Shield, Zap, AlertCircle, ChevronDown,
  ToggleLeft, ToggleRight, Pencil, Webhook, Key, ExternalLink,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type PanelId = 'business' | 'notifications' | 'reports' | 'api' | 'billing' | 'help' | null;

// ─── Shared slide-in panel shell ─────────────────────────────────────────────

function Panel({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div
        className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-6 pb-5 border-b border-[#ECEDF1] flex-none">
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F5F6F8] flex items-center justify-center text-muted-foreground hover:text-ink transition-colors flex-none">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-xl font-extrabold text-ink flex-1">{title}</h2>
        </div>
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Business Settings ───────────────────────────────────────────────

function BusinessSettingsPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "Amara's Kitchen",
    handle: 'amaraskitchen',
    category: 'Restaurant',
    phone: '+234 801 234 5678',
    email: 'hello@amaraskitchen.com',
    address: '12 Wuse Street, Abuja, FCT',
    description: 'Home-cooked meals made with love. Jollof, Egusi, Grills & more.',
  });
  const [hours, setHours] = useState([
    { day: 'Mon – Fri', open: '08:00', close: '21:00', enabled: true },
    { day: 'Saturday',  open: '09:00', close: '22:00', enabled: true },
    { day: 'Sunday',    open: '10:00', close: '18:00', enabled: false },
  ]);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
    <div>
      <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1.5 px-1">{hint}</p>}
    </div>
  );

  const Input = ({ value, onChange, placeholder, prefix }: { value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string }) => (
    <div className="flex items-center h-12 rounded-2xl border border-[#ECEDF1] bg-[#F8F9FB] overflow-hidden focus-within:border-[#5B4FE8] focus-within:ring-2 focus-within:ring-[#5B4FE8]/10 transition-all">
      {prefix && <span className="pl-4 pr-1 text-sm font-bold text-muted-foreground flex-none">{prefix}</span>}
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="flex-1 px-4 text-sm font-semibold bg-transparent outline-none" />
    </div>
  );

  const categories = ['Restaurant', 'Retail', 'Beauty', 'Fashion', 'Services', 'Other'];

  return (
    <Panel title="Business Settings" onClose={onClose}>
      <div className="px-6 py-6 space-y-6 pb-28">

        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7EC821] to-[#5B4FE8] flex items-center justify-center text-white font-extrabold text-2xl flex-none shadow-md">
            {form.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <button className="text-sm font-bold text-[#5B4FE8] hover:opacity-80 mb-1 block">Upload photo</button>
            <p className="text-xs text-muted-foreground">PNG or JPG · max 5 MB</p>
          </div>
        </div>

        <Field label="Business name">
          <Input value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
        </Field>

        <Field label="Handle" hint="Your unique URL: relay.app/@handle">
          <Input value={form.handle} onChange={v => setForm(f => ({ ...f, handle: v }))} prefix="@" />
        </Field>

        <Field label="Category">
          <div className="grid grid-cols-3 gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                className={`py-2.5 rounded-2xl text-sm font-bold border transition-all ${form.category === c ? 'bg-ink text-white border-ink' : 'border-[#ECEDF1] bg-[#F8F9FB] text-muted-foreground hover:border-ink/20'}`}>
                {c}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={3}
            className="w-full rounded-2xl border border-[#ECEDF1] bg-[#F8F9FB] p-4 text-sm font-semibold resize-none outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/10 transition-all"
          />
        </Field>

        <div className="h-px bg-[#ECEDF1]" />

        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">Contact</h3>
          <Field label="Phone"><Input value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} /></Field>
          <Field label="Email"><Input value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} /></Field>
          <Field label="Address"><Input value={form.address} onChange={v => setForm(f => ({ ...f, address: v }))} /></Field>
        </div>

        <div className="h-px bg-[#ECEDF1]" />

        {/* Hours */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Opening hours</h3>
          <div className="space-y-3">
            {hours.map((h, i) => (
              <div key={h.day} className="flex items-center gap-3">
                <button onClick={() => setHours(prev => prev.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))} className="flex-none">
                  {h.enabled ? <ToggleRight size={26} className="text-[#5B4FE8]" /> : <ToggleLeft size={26} className="text-muted-foreground" />}
                </button>
                <span className="text-sm font-bold text-ink w-24 flex-none">{h.day}</span>
                {h.enabled ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input type="time" value={h.open} onChange={e => setHours(p => p.map((x, j) => j === i ? { ...x, open: e.target.value } : x))} className="flex-1 h-9 rounded-xl border border-[#ECEDF1] bg-[#F8F9FB] px-2 text-xs font-bold outline-none focus:border-[#5B4FE8]" />
                    <span className="text-xs text-muted-foreground">–</span>
                    <input type="time" value={h.close} onChange={e => setHours(p => p.map((x, j) => j === i ? { ...x, close: e.target.value } : x))} className="flex-1 h-9 rounded-xl border border-[#ECEDF1] bg-[#F8F9FB] px-2 text-xs font-bold outline-none focus:border-[#5B4FE8]" />
                  </div>
                ) : (
                  <span className="text-xs font-bold text-muted-foreground">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky save */}
      <div className="sticky bottom-0 px-6 pb-6 pt-4 bg-white border-t border-[#ECEDF1]">
        <button onClick={save} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors">
          {saved ? <><Check size={18} className="text-lime" /> Saved!</> : <><Save size={16} /> Save changes</>}
        </button>
      </div>
    </Panel>
  );
}

// ─── Section: Notifications ───────────────────────────────────────────────────

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState({
    new_order: true,    order_status: true, low_stock: true,
    campaign_done: false, new_customer: true,  payment_failed: true,
    daily_summary: true, weekly_report: false,
  });
  const [channels, setChannels] = useState({ push: true, sms: false, email: true });
  const [saved, setSaved] = useState(false);

  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));
  const toggleCh = (k: keyof typeof channels) => setChannels(p => ({ ...p, [k]: !p[k] }));

  const groups = [
    {
      title: 'Orders', items: [
        { key: 'new_order' as const,    label: 'New order received',       desc: 'Instantly when a customer places an order' },
        { key: 'order_status' as const, label: 'Order status updates',     desc: 'When a customer changes their order' },
        { key: 'payment_failed' as const,label:'Payment failure',          desc: 'When a card or transfer attempt fails' },
      ]
    },
    {
      title: 'Inventory', items: [
        { key: 'low_stock' as const,    label: 'Low stock warning',        desc: 'When a product drops below 10 units' },
      ]
    },
    {
      title: 'Customers & Marketing', items: [
        { key: 'new_customer' as const,  label: 'New customer signup',     desc: 'When someone creates an account on your storefront' },
        { key: 'campaign_done' as const, label: 'Campaign completed',      desc: 'When a blast or automation finishes' },
      ]
    },
    {
      title: 'Reports', items: [
        { key: 'daily_summary' as const, label: 'Daily summary',          desc: 'End-of-day revenue + order recap' },
        { key: 'weekly_report' as const, label: 'Weekly insights',        desc: 'Trends, top products, cohort changes' },
      ]
    },
  ];

  return (
    <Panel title="Notifications" onClose={onClose}>
      <div className="px-6 py-6 space-y-6 pb-28">

        {/* Channels */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Delivery channels</h3>
          <div className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] overflow-hidden">
            {([['push', 'Push notifications', 'On this device'], ['sms', 'SMS', '+234 801 234 5678'], ['email', 'Email', 'hello@amaraskitchen.com']] as const).map(([key, label, sub], i, arr) => (
              <div key={key} className={`flex items-center justify-between px-5 py-4 ${i < arr.length - 1 ? 'border-b border-[#ECEDF1]' : ''}`}>
                <div>
                  <div className="text-sm font-bold text-ink">{label}</div>
                  <div className="text-xs text-muted-foreground font-medium">{sub}</div>
                </div>
                <button onClick={() => toggleCh(key)}>
                  {channels[key] ? <ToggleRight size={28} className="text-[#5B4FE8]" /> : <ToggleLeft size={28} className="text-muted-foreground" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Groups */}
        {groups.map(g => (
          <div key={g.title}>
            <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">{g.title}</h3>
            <div className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] overflow-hidden">
              {g.items.map((item, i) => (
                <div key={item.key} className={`flex items-center justify-between px-5 py-4 ${i < g.items.length - 1 ? 'border-b border-[#ECEDF1]' : ''}`}>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-sm font-bold text-ink">{item.label}</div>
                    <div className="text-xs text-muted-foreground font-medium leading-snug mt-0.5">{item.desc}</div>
                  </div>
                  <button onClick={() => toggle(item.key)} className="flex-none">
                    {prefs[item.key] ? <ToggleRight size={28} className="text-[#5B4FE8]" /> : <ToggleLeft size={28} className="text-muted-foreground" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 px-6 pb-6 pt-4 bg-white border-t border-[#ECEDF1]">
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors">
          {saved ? <><Check size={18} className="text-lime" /> Saved!</> : <><Save size={16} /> Save preferences</>}
        </button>
      </div>
    </Panel>
  );
}

// ─── Section: Reports & Analytics ────────────────────────────────────────────

function ReportsPanel({ onClose }: { onClose: () => void }) {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = {
    '7d':  { revenue: 312000, orders: 48, customers: 31, avgOrder: 6500, topProduct: 'Jollof Rice Combo', topRevenue: '₦89,500' },
    '30d': { revenue: 1245000, orders: 186, customers: 124, avgOrder: 6694, topProduct: 'Jollof Rice Combo', topRevenue: '₦342,000' },
    '90d': { revenue: 3820000, orders: 541, customers: 318, avgOrder: 7060, topProduct: 'Grilled Chicken', topRevenue: '₦1.1M' },
  };
  const s = stats[range];

  // Bar chart data (normalized)
  const bars7d  = [42, 67, 55, 89, 71, 95, 80];
  const bars30d = [30,55,70,45,60,80,65,75,50,90,85,70,60,55,75,95,80,65,70,85,90,60,75,80,95,85,70,60,80,100];
  const bars90d = Array.from({ length: 12 }, (_, i) => 40 + Math.round(Math.sin(i / 2) * 30 + Math.random() * 20));
  const bars = range === '7d' ? bars7d : range === '30d' ? bars30d : bars90d;

  const topProducts = [
    { name: 'Jollof Rice Combo', sales: range === '7d' ? 22 : range === '30d' ? 84 : 241, pct: 100 },
    { name: 'Grilled Chicken',   sales: range === '7d' ? 18 : range === '30d' ? 71 : 198, pct: 82 },
    { name: 'Fresh Garden Salad', sales: range === '7d' ? 9 : range === '30d' ? 31 : 102, pct: 42 },
  ];

  const StatCard = ({ label, value, sub, up }: { label: string; value: string; sub?: string; up?: boolean }) => (
    <div className="bg-[#F8F9FB] rounded-[20px] p-5 border border-[#ECEDF1]">
      <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      <p className="text-2xl font-extrabold text-ink">{value}</p>
      {sub && (
        <div className="flex items-center gap-1 mt-1">
          {up ? <TrendingUp size={12} className="text-[#27AE60]" /> : <TrendingDown size={12} className="text-destructive" />}
          <span className={`text-xs font-bold ${up ? 'text-[#27AE60]' : 'text-destructive'}`}>{sub}</span>
        </div>
      )}
    </div>
  );

  return (
    <Panel title="Reports & Analytics" onClose={onClose}>
      <div className="px-6 py-6 space-y-6 pb-10">

        {/* Range picker */}
        <div className="flex bg-[#F5F6F8] p-1.5 rounded-full gap-1">
          {(['7d', '30d', '90d'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)} className={`flex-1 py-2 text-sm font-extrabold rounded-full transition-all ${range === r ? 'bg-white text-ink shadow-sm' : 'text-muted-foreground hover:text-ink'}`}>
              {r === '7d' ? '7 days' : r === '30d' ? '30 days' : '90 days'}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Revenue" value={`₦${(s.revenue / 1000).toFixed(0)}K`} sub="+12% vs prev" up />
          <StatCard label="Orders" value={String(s.orders)} sub="+8% vs prev" up />
          <StatCard label="Customers" value={String(s.customers)} sub="+18% vs prev" up />
          <StatCard label="Avg. order" value={`₦${s.avgOrder.toLocaleString()}`} sub="-2% vs prev" up={false} />
        </div>

        {/* Revenue bar chart */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Revenue trend</h3>
          <div className="bg-[#F8F9FB] rounded-[20px] p-5 border border-[#ECEDF1]">
            <div className="flex items-end gap-1 h-28">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex items-end">
                  <div className="w-full rounded-t-lg transition-all duration-500" style={{ height: `${h}%`, background: `linear-gradient(to top, #5B4FE8, #A79AFB)`, opacity: 0.85 }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-bold text-muted-foreground">{range === '7d' ? 'Mon' : range === '30d' ? '1 Jun' : 'Apr'}</span>
              <span className="text-[10px] font-bold text-muted-foreground">{range === '7d' ? 'Sun' : range === '30d' ? '30 Jun' : 'Jun'}</span>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Top products</h3>
          <div className="space-y-3">
            {topProducts.map(p => (
              <div key={p.name} className="bg-[#F8F9FB] rounded-[20px] p-4 border border-[#ECEDF1]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-ink">{p.name}</span>
                  <span className="text-sm font-extrabold text-[#5B4FE8]">{p.sales} sold</span>
                </div>
                <div className="h-2 bg-[#ECEDF1] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#5B4FE8] to-[#A79AFB] transition-all duration-700" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer breakdown */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Customer breakdown</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'New', value: Math.round(s.customers * 0.35), color: '#27AE60' },
              { label: 'Returning', value: Math.round(s.customers * 0.5), color: '#5B4FE8' },
              { label: 'Churned', value: Math.round(s.customers * 0.15), color: '#F5A623' },
            ].map(c => (
              <div key={c.label} className="bg-[#F8F9FB] rounded-[20px] p-4 border border-[#ECEDF1] text-center">
                <div className="text-2xl font-extrabold mb-1" style={{ color: c.color }}>{c.value}</div>
                <div className="text-[11px] font-bold text-muted-foreground">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Section: Webhooks & API ──────────────────────────────────────────────────

function ApiPanel({ onClose }: { onClose: () => void }) {
  const [apiKey] = useState('rk_live_YOUR_STRIPE_KEY_HERE');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState('');
  const [webhooks, setWebhooks] = useState([
    { id: 'w1', url: 'https://myapp.vercel.app/api/relay', events: ['order.created', 'order.completed'], active: true },
  ]);
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const addWebhook = () => {
    if (!newUrl.startsWith('http')) return;
    setWebhooks(prev => [...prev, { id: `w${Date.now()}`, url: newUrl, events: ['order.created'], active: true }]);
    setNewUrl('');
    setShowAddWebhook(false);
  };

  const events = ['order.created', 'order.completed', 'order.cancelled', 'customer.created', 'product.low_stock', 'payment.failed'];

  return (
    <Panel title="Webhooks & API" onClose={onClose}>
      <div className="px-6 py-6 space-y-6 pb-10">

        {/* API Key */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">API Key</h3>
          <div className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white rounded-xl border border-[#ECEDF1] px-4 py-3 font-mono text-sm text-ink overflow-hidden">
                {showKey ? apiKey : '•'.repeat(32)}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowKey(!showKey)} className="flex-1 h-10 rounded-full border border-[#ECEDF1] bg-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                <Eye size={14} /> {showKey ? 'Hide' : 'Reveal'}
              </button>
              <button onClick={() => copy(apiKey, 'key')} className="flex-1 h-10 rounded-full border border-[#ECEDF1] bg-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                {copied === 'key' ? <><Check size={14} className="text-[#27AE60]" /> Copied!</> : <><Copy size={14} /> Copy key</>}
              </button>
              <button className="w-10 h-10 rounded-full border border-[#ECEDF1] bg-white flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors" title="Regenerate key">
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="flex items-start gap-2 bg-[#F4D03F]/15 rounded-xl p-3">
              <AlertCircle size={14} className="text-[#C87F0A] flex-none mt-0.5" />
              <p className="text-xs font-semibold text-[#C87F0A] leading-relaxed">Keep this key secret. Regenerating it immediately invalidates the old one.</p>
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Quick start</h3>
          <div className="bg-[#16213E] rounded-[20px] p-5 overflow-x-auto">
            <pre className="text-[12px] font-mono text-[#A79AFB] leading-relaxed whitespace-pre">{`curl https://api.myrelay.shop/v1/orders \\
  -H "Authorization: Bearer rk_live_..." \\
  -H "Content-Type: application/json"`}</pre>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-[#5B4FE8] hover:opacity-80 mt-3">
            <ExternalLink size={13} /> View full API docs
          </a>
        </div>

        {/* Webhooks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">Webhooks</h3>
            <button onClick={() => setShowAddWebhook(true)} className="flex items-center gap-1 text-sm font-bold text-[#5B4FE8] hover:opacity-80">
              <Plus size={14} /> Add
            </button>
          </div>

          {showAddWebhook && (
            <div className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] p-5 mb-3 space-y-3">
              <label className="text-xs font-bold text-muted-foreground block">Endpoint URL</label>
              <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://yourapp.com/api/webhook" className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
              <div className="flex gap-2">
                <button onClick={addWebhook} className="flex-1 h-10 rounded-full bg-ink text-white font-bold text-sm hover:bg-ink/90 transition-colors">Save</button>
                <button onClick={() => setShowAddWebhook(false)} className="flex-1 h-10 rounded-full border border-[#ECEDF1] font-bold text-sm hover:bg-muted transition-colors">Cancel</button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {webhooks.map(wh => (
              <div key={wh.id} className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-ink break-all leading-relaxed">{wh.url}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-none">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${wh.active ? 'bg-[#27AE60]/10 text-[#27AE60]' : 'bg-muted text-muted-foreground'}`}>{wh.active ? 'Active' : 'Paused'}</span>
                    <button onClick={() => setWebhooks(p => p.filter(x => x.id !== wh.id))} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {wh.events.map(ev => (
                    <span key={ev} className="text-[10px] font-bold bg-[#5B4FE8]/10 text-[#5B4FE8] px-2.5 py-1 rounded-full">{ev}</span>
                  ))}
                </div>
              </div>
            ))}
            {webhooks.length === 0 && (
              <div className="h-24 flex items-center justify-center text-sm font-semibold text-muted-foreground border-2 border-dashed border-[#ECEDF1] rounded-[20px]">No webhooks yet</div>
            )}
          </div>
        </div>

        {/* Events reference */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Available events</h3>
          <div className="flex flex-wrap gap-2">
            {events.map(ev => (
              <span key={ev} className="text-[11px] font-bold bg-[#F8F9FB] border border-[#ECEDF1] text-ink px-3 py-1.5 rounded-full">{ev}</span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Section: Plan & Billing ─────────────────────────────────────────────────

function BillingPanel({ onClose }: { onClose: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const usage = [
    { label: 'Orders this month',  used: 186, max: 500,  unit: 'orders' },
    { label: 'Products',           used: 14,  max: 50,   unit: 'products' },
    { label: 'Customers',          used: 124, max: 500,  unit: 'customers' },
    { label: 'Team members',       used: 3,   max: 5,    unit: 'seats' },
    { label: 'Storefront',         used: 1,   max: 1,    unit: 'live store' },
    { label: 'API calls / day',    used: 240, max: 1000, unit: 'calls' },
  ];

  const invoices = [
    { date: 'Jun 1, 2026', amount: '₦24,000', status: 'Paid' },
    { date: 'May 1, 2026', amount: '₦24,000', status: 'Paid' },
    { date: 'Apr 1, 2026', amount: '₦24,000', status: 'Paid' },
  ];

  const proFeatures = [
    'Unlimited orders & products', 'Up to 20 team members', 'Advanced analytics + exports',
    'Custom domain on your storefront', 'Priority support', 'White-label receipts',
  ];

  return (
    <Panel title="Plan & Billing" onClose={onClose}>
      <div className="px-6 py-6 space-y-6 pb-10">

        {/* Current plan */}
        <div className="bg-[#16213E] rounded-[28px] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-extrabold text-white/60 uppercase tracking-widest mb-1">Current plan</div>
              <div className="text-2xl font-extrabold">Growth</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#7EC821] flex items-center justify-center">
              <Zap size={22} className="text-ink" />
            </div>
          </div>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-extrabold">₦24,000</span>
            <span className="text-white/60 text-sm font-semibold mb-1">/month</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70 font-semibold">Next billing date</span>
            <span className="font-bold">Aug 1, 2026</span>
          </div>
        </div>

        {/* Usage */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Usage this month</h3>
          <div className="space-y-3">
            {usage.map(u => {
              const pct = Math.min((u.used / u.max) * 100, 100);
              const color = pct > 85 ? '#F5A623' : pct > 95 ? '#E53E3E' : '#5B4FE8';
              return (
                <div key={u.label} className="bg-[#F8F9FB] rounded-[16px] px-5 py-4 border border-[#ECEDF1]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-ink">{u.label}</span>
                    <span className="text-xs font-extrabold" style={{ color }}>{u.used} / {u.max}</span>
                  </div>
                  <div className="h-2 bg-[#ECEDF1] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upgrade card */}
        <div className="bg-gradient-to-br from-[#5B4FE8] to-[#A79AFB] rounded-[24px] p-6 text-white">
          <div className="text-sm font-extrabold mb-1">Upgrade to Pro</div>
          <div className="text-xs text-white/75 font-semibold mb-4">Remove all limits and unlock power features.</div>
          <div className="space-y-2 mb-5">
            {proFeatures.map(f => (
              <div key={f} className="flex items-center gap-2">
                <Check size={13} className="text-[#7EC821] flex-none" />
                <span className="text-xs font-semibold">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full h-12 rounded-full bg-white text-[#5B4FE8] font-extrabold text-sm hover:bg-white/90 transition-colors shadow-lg">
            Upgrade to Pro — ₦55,000/mo
          </button>
        </div>

        {/* Invoices */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Invoice history</h3>
          <div className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] overflow-hidden">
            {invoices.map((inv, i) => (
              <div key={inv.date} className={`flex items-center justify-between px-5 py-4 ${i < invoices.length - 1 ? 'border-b border-[#ECEDF1]' : ''}`}>
                <div>
                  <div className="text-sm font-bold text-ink">{inv.date}</div>
                  <div className="text-xs text-muted-foreground font-medium">{inv.amount}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold bg-[#27AE60]/10 text-[#27AE60] px-2.5 py-1 rounded-full">{inv.status}</span>
                  <button className="text-[#5B4FE8] text-xs font-bold hover:opacity-80">PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel subscription */}
        {!showConfirm ? (
          <button onClick={() => setShowConfirm(true)} className="w-full py-4 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors text-center">
            Cancel subscription
          </button>
        ) : (
          <div className="bg-destructive/5 border border-destructive/20 rounded-[20px] p-5 space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="text-destructive flex-none mt-0.5" />
              <p className="text-sm font-semibold text-ink leading-snug">Your storefront, analytics, and team access will be removed at the end of your billing period.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 h-11 rounded-full bg-destructive text-white font-bold text-sm hover:opacity-90 transition-opacity">Cancel plan</button>
              <button onClick={() => setShowConfirm(false)} className="flex-1 h-11 rounded-full border border-[#ECEDF1] font-bold text-sm hover:bg-muted transition-colors">Keep plan</button>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}

// ─── Section: Help Center ────────────────────────────────────────────────────

function HelpPanel({ onClose }: { onClose: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const faqs = [
    { q: 'How do I connect a payment gateway?', a: 'Go to Shop → Storefront → Launch. After going live, tap "Payment settings" to connect Paystack, Flutterwave, or enable Bank Transfer and Cash.' },
    { q: 'Can I have multiple storefronts?', a: 'The Growth plan includes 1 live storefront. Upgrading to Pro lets you create unlimited storefronts for different product lines or locations.' },
    { q: 'How does the NFC menu work?', a: 'Each Relay NFC tag stores your storefront URL. Tap a phone to the tag and your menu opens instantly — no app download required by the customer.' },
    { q: 'How do I invite a team member?', a: 'Go to More → Business Settings → Team (coming soon). You can set roles: Admin, Manager, and Staff — each with different access levels.' },
    { q: 'Can I export my order data?', a: 'Yes. Go to Reports & Analytics and tap "Export CSV" at the bottom. Pro plan users get automatic weekly exports to email.' },
    { q: 'What happens when I run out of stock?', a: 'Products with 0 stock are automatically hidden from your storefront. You\'ll get a push notification when any item drops below 10 units.' },
    { q: 'How do I cancel a subscription?', a: 'Go to More → Plan & Billing → Cancel subscription. Your access continues until the end of the current billing period.' },
  ];

  const filtered = faqs.filter(f => !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <Panel title="Help Center" onClose={onClose}>
      <div className="px-6 py-6 space-y-6 pb-10">

        {/* Search */}
        <div className="flex items-center gap-3 h-12 rounded-full border border-[#ECEDF1] bg-[#F8F9FB] px-5">
          <HelpCircle size={15} className="text-muted-foreground flex-none" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search help articles..." className="flex-1 bg-transparent text-sm font-semibold outline-none" />
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Quick links</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Globe, label: 'Storefront guide', color: '#5B4FE8' },
              { icon: ShoppingBag, label: 'Managing orders', color: '#27AE60' },
              { icon: Users, label: 'Customer CRM', color: '#F5A623' },
              { icon: BarChart2, label: 'Reading reports', color: '#E83D7C' },
            ].map(link => (
              <button key={link.label} className="bg-[#F8F9FB] rounded-[20px] p-4 border border-[#ECEDF1] text-left hover:bg-white hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${link.color}18` }}>
                  <link.icon size={16} style={{ color: link.color }} />
                </div>
                <div className="text-sm font-bold text-ink leading-snug">{link.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Frequently asked</h3>
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-[#F8F9FB] rounded-[20px] border border-[#ECEDF1] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-bold text-ink pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown size={16} className={`text-muted-foreground flex-none transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground font-medium leading-relaxed border-t border-[#ECEDF1] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-8 text-center text-sm font-semibold text-muted-foreground">No results for "{query}"</div>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#16213E] rounded-[24px] p-6 text-white">
          <div className="text-sm font-extrabold mb-1">Still need help?</div>
          <div className="text-xs text-white/60 font-semibold mb-4">Our team typically responds within 2 hours on business days.</div>
          <div className="flex gap-3">
            <button className="flex-1 h-11 rounded-full bg-[#7EC821] text-ink font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Mail size={14} /> Email us
            </button>
            <button className="flex-1 h-11 rounded-full border border-white/20 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Phone size={14} /> Call support
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ─── Sign Out Confirmation ────────────────────────────────────────────────────

function SignOutModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300" onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <LogOut size={22} className="text-destructive" />
        </div>
        <h3 className="text-lg font-extrabold text-center mb-1">Sign out?</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">You'll need to sign back in to access Amara's Kitchen.</p>
        <div className="flex flex-col gap-2">
          <button className="w-full h-13 rounded-full bg-destructive text-white font-bold flex items-center justify-center gap-2 hover:bg-destructive/90 transition-colors h-12">
            <LogOut size={16} /> Yes, sign out
          </button>
          <button onClick={onClose} className="w-full h-12 rounded-full border border-[#ECEDF1] font-bold text-sm hover:bg-muted transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main More Page ───────────────────────────────────────────────────────────

export default function More() {
  const [panel, setPanel] = useState<PanelId>(null);
  const [showSignOut, setShowSignOut] = useState(false);

  const rows = [
    { id: 'business'      as PanelId, icon: Store,     label: 'Business Settings', desc: 'Profile, hours, brand identity',    color: '#5B4FE8' },
    { id: 'notifications' as PanelId, icon: Bell,      label: 'Notifications',     desc: 'Channels & alert preferences',       color: '#F5A623' },
    { id: 'reports'       as PanelId, icon: BarChart2, label: 'Reports & Analytics', desc: 'Revenue, orders, customer insights', color: '#27AE60' },
    { id: 'api'           as PanelId, icon: FileText,  label: 'Webhooks & API',    desc: 'Keys, endpoints, events',            color: '#E83D7C' },
    { id: 'billing'       as PanelId, icon: CreditCard,label: 'Plan & Billing',    desc: 'Subscription, usage & invoices', badge: 'Growth', color: '#16213E' },
    { id: 'help'          as PanelId, icon: HelpCircle,label: 'Help Center',       desc: 'FAQs, guides & support',             color: '#7EC821' },
  ];

  return (
    <>
      <div className="h-full overflow-y-auto bg-[#F5F6F8] pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto p-4 md:p-8">

          {/* Profile Header */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm mb-5 border border-[#ECEDF1]">
            <div className="flex items-center gap-5 mb-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7EC821] to-[#5B4FE8] flex items-center justify-center text-white font-extrabold text-2xl flex-none shadow-md relative">
                AK
                <button onClick={() => setPanel('business')} className="absolute -bottom-1 -right-1 w-7 h-7 bg-ink rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition-transform">
                  <Pencil size={11} className="text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-ink">Amara's Kitchen</h2>
                <p className="text-sm font-semibold text-muted-foreground">@amaraskitchen</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><MapPin size={11} /> 12 Wuse St, Abuja</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#ECEDF1]">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-ink">124</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Products</p>
              </div>
              <div className="text-center border-x border-[#ECEDF1]">
                <p className="text-2xl font-extrabold text-ink">3</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Team</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-[#7EC821]">4.8</p>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={9} className={i <= 4 ? 'text-[#F4D03F] fill-[#F4D03F]' : 'text-muted-foreground'} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Menu rows */}
          <div className="bg-white rounded-[32px] overflow-hidden border border-[#ECEDF1] shadow-sm mb-5">
            {rows.map((row, i) => (
              <button
                key={row.id}
                onClick={() => setPanel(row.id)}
                className={`w-full flex items-center justify-between p-5 hover:bg-[#F8F9FB] transition-colors text-left ${i !== rows.length - 1 ? 'border-b border-[#ECEDF1]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-none" style={{ background: `${row.color}15` }}>
                    <row.icon size={19} style={{ color: row.color }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-ink">{row.label}</h4>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{row.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  {row.badge && (
                    <span className="px-2.5 py-1 bg-[#7EC821]/15 text-ink rounded-full text-[10px] font-extrabold">{row.badge}</span>
                  )}
                  <ChevronRight size={17} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>

          {/* Sign out */}
          <button onClick={() => setShowSignOut(true)} className="w-full bg-white border border-[#ECEDF1] text-ink h-14 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#FFF0F0] hover:border-destructive/20 hover:text-destructive transition-all shadow-sm">
            <LogOut size={17} /> Sign out
          </button>

          <p className="mt-6 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Relay OS v1.0.0</p>
        </div>
      </div>

      {/* Panels */}
      {panel === 'business'      && <BusinessSettingsPanel onClose={() => setPanel(null)} />}
      {panel === 'notifications' && <NotificationsPanel    onClose={() => setPanel(null)} />}
      {panel === 'reports'       && <ReportsPanel          onClose={() => setPanel(null)} />}
      {panel === 'api'           && <ApiPanel              onClose={() => setPanel(null)} />}
      {panel === 'billing'       && <BillingPanel          onClose={() => setPanel(null)} />}
      {panel === 'help'          && <HelpPanel             onClose={() => setPanel(null)} />}
      {showSignOut               && <SignOutModal           onClose={() => setShowSignOut(false)} />}
    </>
  );
}
