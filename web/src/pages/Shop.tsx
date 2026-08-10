import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, MoreHorizontal, ShoppingBag, Clock, CheckCircle2,
  Store, ShoppingCart, ChevronLeft, ChevronRight,
  Upload, Check, Copy, Share2, Globe, Layers,
  ArrowRight, Eye, Palette, Image as ImageIcon, ExternalLink,
  GripVertical, ToggleRight, ToggleLeft, X,
  Tag, Package, Puzzle, Pencil, Trash2, UtensilsCrossed,
  ChevronDown, Star, MessageCircle
} from 'lucide-react';
import { StorefrontTheme, themes } from '../storefront/themes';
import WhatsAppShopping from './WhatsAppShopping';
import WhatsAppShoppingExperience from './WhatsAppShoppingExperience';
import OnboardingWizard from './whatsapp-onboarding/OnboardingWizard';
import { useOnboardingStore } from './whatsapp-onboarding/useOnboardingStore';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'orders' | 'storefront' | 'whatsapp';
type StorefrontStep = 'templates' | 'customize' | 'products' | 'preview' | 'launch';
type ProductsSubTab = 'products' | 'categories' | 'addons';

// ─── Orders Data ──────────────────────────────────────────────────────────────

const STAGES = ['New', 'Confirmed', 'Preparing', 'Ready', 'Completed'];

const STAGE_COLORS: Record<string, string> = {
  'New':       'border-warning text-warning bg-warning/10',
  'Confirmed': 'border-lime text-lime-dark bg-lime/10',
  'Preparing': 'border-ink text-ink bg-ink/5',
  'Ready':     'border-[#5B4FE8] text-[#5B4FE8] bg-[#5B4FE8]/10',
  'Completed': 'border-success text-success bg-success/10',
};

const CARD_ACCENTS = [
  { bg: '#F1F0EE', text: '#16213E', sub: '#8A8F98', border: '#E8E7E5' },
  { bg: '#1B2942', text: '#FFFFFF', sub: 'rgba(255,255,255,0.55)', border: 'rgba(255,255,255,0.1)' },
  { bg: '#5B4FE8', text: '#FFFFFF', sub: 'rgba(255,255,255,0.65)', border: 'rgba(255,255,255,0.15)' },
  { bg: '#F4D03F', text: '#16213E', sub: '#7A6A1A', border: '#E8CB30' },
];

type PaymentMethod = 'paystack' | 'flutterwave' | 'bank_transfer' | 'cash';
type PaymentStatus = 'Paid' | 'Pending' | 'Completed';

interface Order {
  id: string; customer: string; amount: number; stage: string;
  date: string; time?: string; items: number;
  paymentMethod: PaymentMethod; paymentStatus: PaymentStatus; itemNames: string[];
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  paystack: 'Paystack', flutterwave: 'Flutterwave', bank_transfer: 'Bank Transfer', cash: 'Cash',
};

const PAYMENT_STATUS_COLORS: Record<PaymentStatus, { bg: string; text: string }> = {
  Paid:      { bg: 'rgba(39,174,96,0.12)',   text: '#27AE60' },
  Pending:   { bg: 'rgba(245,166,35,0.12)',  text: '#F5A623' },
  Completed: { bg: 'rgba(91,79,232,0.12)',   text: '#5B4FE8' },
};

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Amara Okafor',     amount: 45000, stage: 'New',       date: '10:42 AM', items: 3, paymentMethod: 'paystack',     paymentStatus: 'Pending',   itemNames: ['Jollof Rice Combo', 'Grilled Chicken', 'Iced Tea'] },
  { id: 'ORD-002', customer: 'Fatima Abubakar',  amount: 12000, stage: 'Confirmed', date: '09:15 AM', items: 1, paymentMethod: 'flutterwave',   paymentStatus: 'Paid',      itemNames: ['Jollof Rice Combo'] },
  { id: 'ORD-003', customer: 'Chinedu Eze',      amount: 8500,  stage: 'Preparing', date: 'Yesterday', items: 2, paymentMethod: 'bank_transfer', paymentStatus: 'Pending',   itemNames: ['Fresh Salad', 'Iced Tea'] },
  { id: 'ORD-004', customer: 'Nneka Igwe',       amount: 32000, stage: 'Ready',     date: 'Yesterday', items: 4, paymentMethod: 'cash',          paymentStatus: 'Pending',   itemNames: ['Jollof Rice Combo', 'Grilled Chicken', 'Fresh Salad', 'Iced Tea'] },
  { id: 'ORD-005', customer: 'Oluwaseun Adeyemi',amount: 15000, stage: 'Completed', date: '2 days ago', items: 1, paymentMethod: 'paystack',    paymentStatus: 'Completed', itemNames: ['Grilled Chicken'] },
  { id: 'ORD-006', customer: 'Adebayo Adekunle', amount: 21000, stage: 'New',       date: '11:05 AM', items: 2, paymentMethod: 'flutterwave',   paymentStatus: 'Paid',      itemNames: ['Jollof Rice Combo', 'Fresh Salad'] },
];

// ─── Storefront Data ──────────────────────────────────────────────────────────

type CategoryFilter = 'All' | 'Restaurant & Café' | 'Fashion' | 'Beauty' | 'Retail' | 'Services';
const CATEGORY_FILTERS: CategoryFilter[] = ['All', 'Restaurant & Café', 'Fashion', 'Beauty', 'Retail', 'Services'];

/** Sample product sets per style category — used only for previews */
const SAMPLE_PRODUCTS_BY_TYPE: Record<string, { name: string; price: number }[]> = {
  food: [
    { name: 'Jollof Rice Combo', price: 4500 },
    { name: 'Grilled Chicken', price: 3000 },
    { name: 'Fresh Garden Salad', price: 2500 },
    { name: 'Iced Tea', price: 1200 },
    { name: 'Plantain & Stew', price: 3500 },
    { name: 'Puff Puff (6 pcs)', price: 800 },
  ],
  fashion: [
    { name: 'Linen Shirt', price: 18000 },
    { name: 'Leather Sneakers', price: 45000 },
    { name: 'Crossbody Bag', price: 22000 },
    { name: 'Wide-Leg Trousers', price: 15000 },
    { name: 'Gold Hoop Earrings', price: 9500 },
    { name: 'Oversized Blazer', price: 35000 },
  ],
  beauty: [
    { name: 'Vitamin C Serum', price: 8500 },
    { name: 'Matte Lipstick', price: 3200 },
    { name: 'Hydrating Face Cream', price: 6500 },
    { name: 'Tinted Primer', price: 4800 },
    { name: 'Brow Gel', price: 2800 },
    { name: 'Rose Water Toner', price: 5000 },
  ],
  retail: [
    { name: 'Wireless Earbuds', price: 35000 },
    { name: 'Phone Case', price: 5500 },
    { name: 'USB-C Hub', price: 18000 },
    { name: 'Screen Protector', price: 2200 },
    { name: 'Desk Lamp', price: 12000 },
    { name: 'Portable Charger', price: 9800 },
  ],
  services: [
    { name: 'Strategy Session', price: 50000 },
    { name: 'Brand Identity Package', price: 120000 },
    { name: 'Monthly Retainer', price: 80000 },
    { name: 'Quick Consult (1hr)', price: 25000 },
    { name: 'Social Media Audit', price: 35000 },
    { name: 'Logo Design', price: 45000 },
  ],
};

const ACCENT_COLORS = [
  { id: 'purple', hex: '#5B4FE8', label: 'Violet' },
  { id: 'pink',   hex: '#E83D7C', label: 'Rose' },
  { id: 'yellow', hex: '#F4D03F', label: 'Gold' },
  { id: 'ink',    hex: '#16213E', label: 'Midnight' },
  { id: 'green',  hex: '#27AE60', label: 'Sage' },
  { id: 'orange', hex: '#FF8C42', label: 'Ember' },
];

// ─── Product Catalog Data ──────────────────────────────────────────────────────

interface Category { id: string; name: string; emoji: string; count: number }
interface CatalogProduct { id: string; name: string; price: number; category: string; description: string; available: boolean; featured: boolean; stock: number }
interface AddonOption { id: string; name: string; price: number }
interface AddonGroup { id: string; name: string; required: boolean; multi: boolean; options: AddonOption[] }

const INITIAL_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Food',    emoji: '🍽️', count: 3 },
  { id: 'c2', name: 'Drinks',  emoji: '🥤', count: 1 },
  { id: 'c3', name: 'Specials', emoji: '⭐', count: 0 },
];

const INITIAL_PRODUCTS: CatalogProduct[] = [
  { id: 'P1', name: 'Jollof Rice Combo', price: 4500, category: 'Food',   description: 'Smoky jollof rice with chicken and fried plantain', available: true,  featured: true,  stock: 45 },
  { id: 'P2', name: 'Grilled Chicken',   price: 3000, category: 'Food',   description: 'Half chicken, seasoned and grilled to order',        available: true,  featured: false, stock: 12 },
  { id: 'P3', name: 'Fresh Garden Salad',price: 2500, category: 'Food',   description: 'Seasonal vegetables, house dressing',               available: true,  featured: false, stock: 30 },
  { id: 'P4', name: 'Chilled Iced Tea',  price: 1200, category: 'Drinks', description: 'Homemade lemon iced tea',                           available: false, featured: false, stock: 0  },
];

const INITIAL_ADDONS: AddonGroup[] = [
  { id: 'a1', name: 'Protein choice', required: true,  multi: false, options: [{ id: 'o1', name: 'Chicken', price: 0 }, { id: 'o2', name: 'Fish +₦500', price: 500 }, { id: 'o3', name: 'Beef +₦800', price: 800 }] },
  { id: 'a2', name: 'Extras',         required: false, multi: true,  options: [{ id: 'o4', name: 'Extra sauce', price: 200 }, { id: 'o5', name: 'Extra plantain', price: 300 }] },
  { id: 'a3', name: 'Spice level',    required: false, multi: false, options: [{ id: 'o6', name: 'Mild', price: 0 }, { id: 'o7', name: 'Medium', price: 0 }, { id: 'o8', name: 'Hot', price: 0 }] },
];

// ─── Shared pill style ────────────────────────────────────────────────────────

const pill = (active: boolean) =>
  `px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap flex-none ${
    active ? 'bg-[#16213E] text-white shadow-sm' : 'bg-[#F5F6F8] text-[#8A8F98] hover:bg-[#ECEDF1]'
  }`;

// ─── Order Detail Modal ───────────────────────────────────────────────────────

function OrderDetailModal({ order, onClose, onAdvance }: { order: Order; onClose: () => void; onAdvance: () => void }) {
  const stageIndex = STAGES.indexOf(order.stage);
  const isLast = stageIndex === STAGES.length - 1;
  const nextStage = isLast ? null : STAGES[stageIndex + 1];
  const ps = PAYMENT_STATUS_COLORS[order.paymentStatus];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in" onClick={onClose}>
      <div className="w-full max-w-md bg-card rounded-t-[32px] md:rounded-[32px] shadow-2xl flex flex-col max-h-[90dvh] overflow-y-auto animate-in slide-in-from-bottom-8 duration-300" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b flex-none">
          <div>
            <div className="text-[11px] font-extrabold text-muted-foreground tracking-widest mb-1">{order.id}</div>
            <h3 className="text-xl font-extrabold text-ink">{order.customer}</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 flex-1">
          {/* Pipeline */}
          <div>
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Progress</div>
            <div className="flex items-center gap-1">
              {STAGES.map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`flex-1 text-center text-[10px] font-extrabold py-1.5 rounded-full ${i < stageIndex ? 'bg-success/15 text-success' : i === stageIndex ? 'bg-ink text-white' : 'bg-muted text-muted-foreground'}`}>{s}</div>
                  {i < STAGES.length - 1 && <div className={`w-1.5 h-px flex-none ${i < stageIndex ? 'bg-success' : 'bg-border'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Items · {order.items}</div>
            <div className="space-y-2">
              {order.itemNames.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-4 bg-muted/60 rounded-2xl">
                  <ShoppingBag size={13} className="text-muted-foreground flex-none" />
                  <span className="text-sm font-semibold text-ink flex-1">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-muted/40 rounded-[20px] p-5 space-y-3">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Payment</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Total</span>
              <span className="text-2xl font-extrabold text-ink">₦{order.amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-dashed">
              <span className="text-sm font-semibold text-muted-foreground">Method</span>
              <span className="text-sm font-bold">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Status</span>
              <span className="text-xs font-extrabold px-3 py-1.5 rounded-full" style={{ background: ps.bg, color: ps.text }}>{order.paymentStatus}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
            <Clock size={13} />{order.time || order.date}
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 flex-none">
          {!isLast ? (
            <button onClick={() => { onAdvance(); onClose(); }} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors">
              Mark as {nextStage} <ArrowRight size={18} />
            </button>
          ) : (
            <div className="w-full h-14 rounded-full bg-success/10 text-success font-extrabold flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> Order completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Orders Kanban ────────────────────────────────────────────────────────────

function OrdersKanban() {
  const [activeStage, setActiveStage] = useState('New');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const advanceOrder = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const idx = STAGES.indexOf(o.stage);
      const next = idx < STAGES.length - 1 ? STAGES[idx + 1] : o.stage;
      return { ...o, stage: next, paymentStatus: next === 'Completed' ? 'Completed' : o.paymentStatus };
    }));
  };

  return (
    <>
      <div className="h-full flex flex-col bg-[#F5F6F8]">
        {/* Stage chips — mobile/tablet */}
        <div className="xl:hidden px-4 py-3 bg-card border-b flex-none">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {STAGES.map(stage => {
              const count = orders.filter(o => o.stage === stage).length;
              return (
                <button key={stage} onClick={() => setActiveStage(stage)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap flex-none transition-all ${activeStage === stage ? 'bg-ink text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {stage}
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${activeStage === stage ? 'bg-white/20 text-white' : 'bg-background text-ink'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4 md:p-6 pb-24 md:pb-6">
          <div className="flex gap-5 h-full w-max">
            {STAGES.map(stage => {
              const stageOrders = orders.filter(o => o.stage === stage);
              const isVisible = activeStage === stage || (typeof window !== 'undefined' && window.innerWidth >= 1280);
              if (!isVisible) return null;
              return (
                <div key={stage} className="flex flex-col w-[300px] max-w-[88vw] flex-none h-full bg-white rounded-[28px] overflow-hidden border border-[#ECEDF1] shadow-sm">
                  <div className="px-5 py-4 border-b flex items-center justify-between flex-none">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${STAGE_COLORS[stage].split(' ')[0].replace('border-', 'bg-').replace('-warning', '-[#F5A623]').replace('-success', '-[#27AE60]')}`} style={{
                        background: stage === 'New' ? '#F5A623' : stage === 'Confirmed' ? '#7EC821' : stage === 'Preparing' ? '#16213E' : stage === 'Ready' ? '#5B4FE8' : '#27AE60'
                      }} />
                      <h3 className="font-extrabold text-sm text-ink">{stage}</h3>
                      <span className="text-[10px] font-extrabold bg-[#F5F6F8] text-muted-foreground px-2 py-0.5 rounded-full">{stageOrders.length}</span>
                    </div>
                    <button className="text-muted-foreground hover:text-ink"><MoreHorizontal size={15} /></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {stageOrders.map((order, ci) => {
                      const a = CARD_ACCENTS[ci % CARD_ACCENTS.length];
                      const si = STAGES.indexOf(order.stage);
                      const last = si === STAGES.length - 1;
                      const ps = PAYMENT_STATUS_COLORS[order.paymentStatus];
                      return (
                        <div key={order.id} onClick={() => setSelectedOrder(order)} className="rounded-[20px] p-4 cursor-pointer hover:scale-[1.015] active:scale-[0.99] transition-transform" style={{ background: a.bg }}>
                          <div className="flex justify-between items-start mb-2.5">
                            <span className="text-[10px] font-extrabold tracking-widest" style={{ color: a.sub }}>{order.id}</span>
                            <span className="text-[10px] font-bold flex items-center gap-1" style={{ color: a.sub }}><Clock size={9} />{order.time || order.date}</span>
                          </div>
                          <h4 className="font-extrabold text-sm mb-0.5" style={{ color: a.text }}>{order.customer}</h4>
                          <p className="text-xs font-medium mb-2.5" style={{ color: a.sub }}>{order.items} item{order.items !== 1 ? 's' : ''}</p>
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[10px] font-extrabold px-2 py-1 rounded-full" style={{ background: ps.bg, color: ps.text }}>{order.paymentStatus}</span>
                            <span className="text-[10px] font-semibold" style={{ color: a.sub }}>{PAYMENT_METHOD_LABELS[order.paymentMethod]}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2.5" style={{ borderTop: `1px dashed ${a.border}` }}>
                            <span className="font-extrabold text-sm" style={{ color: a.text }}>₦{order.amount.toLocaleString()}</span>
                            {!last ? (
                              <button onClick={e => { e.stopPropagation(); advanceOrder(order.id); }} className="text-[10px] font-extrabold px-2.5 py-1.5 rounded-full hover:opacity-90 transition-opacity" style={{ background: a.text === '#FFFFFF' ? 'rgba(255,255,255,0.18)' : '#16213E', color: '#fff' }}>→ {STAGES[si + 1]}</button>
                            ) : (
                              <CheckCircle2 size={15} style={{ color: a.text === '#FFFFFF' ? 'rgba(255,255,255,0.5)' : '#27AE60' }} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {stageOrders.length === 0 && (
                      <div className="h-28 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-[#ECEDF1] rounded-[20px]">
                        <ShoppingBag size={18} className="mb-1.5 opacity-40" />
                        <p className="text-xs font-bold">No orders</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onAdvance={() => { advanceOrder(selectedOrder.id); setSelectedOrder(null); }} />
      )}
    </>
  );
}

// ─── Phone Preview Component ──────────────────────────────────────────────────

function PhonePreview({ businessName, accentColor, theme, products, visibleProducts }: {
  businessName: string;
  accentColor: typeof ACCENT_COLORS[0];
  theme?: StorefrontTheme;
  products: CatalogProduct[];
  visibleProducts: Record<string, boolean>;
}) {
  const shown = products.filter(p => visibleProducts[p.id] ?? true).slice(0, 6);
  const accent    = theme ? theme.colors.accent    : accentColor.hex;
  const accentInk = theme ? theme.colors.accentInk : (accentColor.id === 'ink' || accentColor.id === 'purple' ? '#fff' : '#16213E');
  const bg        = theme ? theme.colors.bg        : '#ffffff';
  const surface   = theme ? theme.colors.surface   : '#ffffff';
  const ink       = theme ? theme.colors.ink       : '#16213E';
  const muted     = theme ? theme.colors.muted     : '#8A8F98';
  const border    = theme ? theme.colors.border    : '#ECEDF1';
  const heroGrad  = theme
    ? `linear-gradient(145deg, ${theme.colors.bg} 0%, ${theme.colors.accent} 100%)`
    : `linear-gradient(145deg, ${accentColor.hex}44, ${accentColor.hex})`;
  const cardRadius = theme?.radius.card ?? '12px';
  const btnRadius  = theme?.radius.button ?? '999px';

  return (
    <div className="w-[220px] rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(22,33,62,0.25)] border-[3px] border-[#16213E]/20 flex-none mx-auto" style={{ background: bg }}>
      {/* Notch */}
      <div className="h-6 flex items-center justify-center" style={{ background: ink }}>
        <div className="w-14 h-3 rounded-full" style={{ background: ink }} />
      </div>
      {/* Cover */}
      <div className="h-24 relative" style={{ background: heroGrad }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border-2 border-white/50 flex items-center justify-center font-extrabold text-white text-xs shadow" style={{ background: accent }}>
            {businessName.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-white font-extrabold text-[11px] drop-shadow-sm max-w-[110px] truncate">{businessName}</span>
        </div>
      </div>
      {/* Category bar */}
      <div className="flex gap-1.5 px-2.5 py-2 border-b overflow-x-auto scrollbar-hide" style={{ background: surface, borderColor: border }}>
        {['All', 'Food', 'Drinks'].map((c, i) => (
          <span key={c} className="text-[9px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap flex-none" style={i === 0 ? { background: accent, color: accentInk } : { background: bg, color: muted }}>{c}</span>
        ))}
      </div>
      {/* Products */}
      <div className="p-2 grid grid-cols-2 gap-1.5 min-h-[120px]" style={{ background: bg }}>
        {shown.map(p => (
          <div key={p.id} className="overflow-hidden shadow-sm" style={{ background: surface, borderRadius: cardRadius }}>
            <div className="h-12 flex items-center justify-center" style={{ background: bg }}>
              <UtensilsCrossed size={13} className="opacity-20" style={{ color: muted }} />
            </div>
            <div className="p-1.5">
              <div className="text-[9px] font-bold truncate leading-tight" style={{ color: ink }}>{p.name}</div>
              <div className="text-[9px] font-extrabold mt-0.5" style={{ color: accent }}>₦{p.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
        {shown.length === 0 && (
          <div className="col-span-2 flex items-center justify-center py-6 text-[10px] font-semibold" style={{ color: muted }}>No items selected</div>
        )}
      </div>
      {/* Cart */}
      <div className="px-2.5 pb-2.5 pt-2" style={{ background: surface }}>
        <div className="w-full py-2 text-[10px] font-extrabold text-center" style={{ background: accent, color: accentInk, borderRadius: btnRadius }}>View cart (0)</div>
      </div>
      {/* Home bar */}
      <div className="h-5 flex items-center justify-center" style={{ background: surface }}>
        <div className="w-16 h-1 bg-black/15 rounded-full" />
      </div>
    </div>
  );
}

// ─── Products Builder ─────────────────────────────────────────────────────────

function ProductsBuilder({ products, setProducts, categories, setCategories, addons, setAddons, visibleProducts, setVisibleProducts }: {
  products: CatalogProduct[]; setProducts: React.Dispatch<React.SetStateAction<CatalogProduct[]>>;
  categories: Category[];    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addons: AddonGroup[];      setAddons: React.Dispatch<React.SetStateAction<AddonGroup[]>>;
  visibleProducts: Record<string, boolean>; setVisibleProducts: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const [subTab, setSubTab] = useState<ProductsSubTab>('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddAddon, setShowAddAddon] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Food', description: '' });
  const [newCategory, setNewCategory] = useState({ name: '', emoji: '🍽️' });
  const [newAddon, setNewAddon] = useState({ name: '', required: false, options: [{ name: '', price: '' }] });

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p: CatalogProduct = { id: `P${Date.now()}`, name: newProduct.name, price: Number(newProduct.price), category: newProduct.category, description: newProduct.description, available: true, featured: false, stock: 10 };
    setProducts(prev => [...prev, p]);
    setVisibleProducts(prev => ({ ...prev, [p.id]: true }));
    setCategories(prev => prev.map(c => c.name === newProduct.category ? { ...c, count: c.count + 1 } : c));
    setNewProduct({ name: '', price: '', category: 'Food', description: '' });
    setShowAddProduct(false);
  };

  const addCategory = () => {
    if (!newCategory.name) return;
    setCategories(prev => [...prev, { id: `c${Date.now()}`, name: newCategory.name, emoji: newCategory.emoji, count: 0 }]);
    setNewCategory({ name: '', emoji: '🍽️' });
    setShowAddCategory(false);
  };

  const addAddonGroup = () => {
    if (!newAddon.name) return;
    const g: AddonGroup = { id: `a${Date.now()}`, name: newAddon.name, required: newAddon.required, multi: false, options: newAddon.options.filter(o => o.name).map((o, i) => ({ id: `o${Date.now()}${i}`, name: o.name, price: Number(o.price) || 0 })) };
    setAddons(prev => [...prev, g]);
    setNewAddon({ name: '', required: false, options: [{ name: '', price: '' }] });
    setShowAddAddon(false);
  };

  const EMOJIS = ['🍽️', '🥤', '⭐', '🥗', '🍕', '🎂', '🛍️', '💄', '👗', '🔧'];

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b pb-3">
        {(['products', 'categories', 'addons'] as ProductsSubTab[]).map(t => (
          <button key={t} onClick={() => setSubTab(t)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${subTab === t ? 'bg-ink text-white' : 'bg-[#F5F6F8] text-muted-foreground hover:bg-muted'}`}>
            {t === 'products' && <Package size={13} />}
            {t === 'categories' && <Tag size={13} />}
            {t === 'addons' && <Puzzle size={13} />}
            <span className="capitalize">{t}</span>
          </button>
        ))}
      </div>

      {/* ── Products sub-tab ── */}
      {subTab === 'products' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-ink">{products.length} products</p>
              <p className="text-xs text-muted-foreground">Toggle which ones appear on your storefront</p>
            </div>
            <button onClick={() => setShowAddProduct(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink/90 transition-colors">
              <Plus size={14} /> Add product
            </button>
          </div>

          {/* Add Product form */}
          {showAddProduct && (
            <div className="bg-[#F8F9FB] rounded-[20px] p-5 border border-[#E8EDF5] space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-extrabold text-sm text-ink">New product</h4>
                <button onClick={() => setShowAddProduct(false)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"><X size={13} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-muted-foreground block mb-1.5">Product name *</label>
                  <input value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Jollof Rice Combo" className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/15" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1.5">Price (₦) *</label>
                  <input type="number" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} placeholder="0" className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/15" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1.5">Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] appearance-none">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-muted-foreground block mb-1.5">Description</label>
                  <input value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} placeholder="Short description for customers" className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8] focus:ring-2 focus:ring-[#5B4FE8]/15" />
                </div>
                <div className="col-span-2 h-20 border-2 border-dashed border-[#ECEDF1] rounded-2xl flex items-center justify-center gap-2 cursor-pointer hover:bg-white/60 transition-colors">
                  <ImageIcon size={15} className="text-muted-foreground" />
                  <span className="text-xs font-bold text-muted-foreground">Add photo (optional)</span>
                </div>
              </div>
              <button onClick={addProduct} disabled={!newProduct.name || !newProduct.price} className="w-full h-11 rounded-full bg-[#5B4FE8] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#4A3ED4] transition-colors">
                Add to catalog
              </button>
            </div>
          )}

          {/* Product list */}
          <div className="space-y-2">
            {products.map(p => {
              const isOn = visibleProducts[p.id] ?? true;
              return (
                <div key={p.id} className="bg-white rounded-[20px] p-4 border border-[#ECEDF1] flex items-center gap-3 shadow-sm">
                  <GripVertical size={14} className="text-muted-foreground flex-none cursor-grab" />
                  <div className="w-11 h-11 rounded-[14px] bg-[#F5F6F8] flex-none flex items-center justify-center">
                    <UtensilsCrossed size={15} className="text-muted-foreground opacity-40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-ink truncate">{p.name}</span>
                      {p.featured && <Star size={11} className="text-[#F4D03F] fill-[#F4D03F] flex-none" />}
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold">
                      ₦{p.price.toLocaleString()} · {p.category} ·{' '}
                      <span className={p.stock === 0 ? 'text-destructive' : p.stock < 15 ? 'text-[#F5A623]' : ''}>
                        {p.stock === 0 ? 'Out of stock' : p.stock < 15 ? `Low (${p.stock})` : 'In stock'}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setVisibleProducts(prev => ({ ...prev, [p.id]: !isOn }))} className="flex-none">
                    {isOn ? <ToggleRight size={26} className="text-[#5B4FE8]" /> : <ToggleLeft size={26} className="text-muted-foreground" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Categories sub-tab ── */}
      {subTab === 'categories' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-ink">Organise your menu</p>
              <p className="text-xs text-muted-foreground">Categories become filter tabs on your storefront</p>
            </div>
            <button onClick={() => setShowAddCategory(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink/90 transition-colors">
              <Plus size={14} /> Add
            </button>
          </div>

          {showAddCategory && (
            <div className="bg-[#F8F9FB] rounded-[20px] p-5 border border-[#E8EDF5] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-ink">New category</h4>
                <button onClick={() => setShowAddCategory(false)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"><X size={13} /></button>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">Name *</label>
                <input value={newCategory.name} onChange={e => setNewCategory(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Desserts" className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-2">Emoji icon</label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => setNewCategory(p => ({ ...p, emoji: e }))} className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${newCategory.emoji === e ? 'bg-[#5B4FE8]/15 ring-2 ring-[#5B4FE8]' : 'bg-white border border-[#ECEDF1] hover:bg-muted'}`}>{e}</button>
                  ))}
                </div>
              </div>
              <button onClick={addCategory} disabled={!newCategory.name} className="w-full h-11 rounded-full bg-[#5B4FE8] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#4A3ED4] transition-colors">Add category</button>
            </div>
          )}

          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-[20px] p-4 border border-[#ECEDF1] flex items-center gap-3 shadow-sm">
                <GripVertical size={14} className="text-muted-foreground flex-none cursor-grab" />
                <div className="w-11 h-11 rounded-[14px] bg-[#F5F6F8] flex-none flex items-center justify-center text-xl">{cat.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-ink">{cat.name}</div>
                  <div className="text-xs text-muted-foreground font-semibold">{cat.count} item{cat.count !== 1 ? 's' : ''}</div>
                </div>
                <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Add-ons sub-tab ── */}
      {subTab === 'addons' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-ink">Modifier groups</p>
              <p className="text-xs text-muted-foreground">Protein choice, spice level, extras — customers pick these at checkout</p>
            </div>
            <button onClick={() => setShowAddAddon(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-ink text-white rounded-full text-sm font-bold hover:bg-ink/90 transition-colors">
              <Plus size={14} /> Add group
            </button>
          </div>

          {showAddAddon && (
            <div className="bg-[#F8F9FB] rounded-[20px] p-5 border border-[#E8EDF5] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-ink">New modifier group</h4>
                <button onClick={() => setShowAddAddon(false)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"><X size={13} /></button>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">Group name *</label>
                <input value={newAddon.name} onChange={e => setNewAddon(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Protein choice" className="w-full h-11 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-6 rounded-full transition-colors ${newAddon.required ? 'bg-[#5B4FE8]' : 'bg-muted'}`} onClick={() => setNewAddon(p => ({ ...p, required: !p.required }))}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm mt-0.5 transition-transform ${newAddon.required ? 'translate-x-4.5' : 'translate-x-0.5'}`} style={{ transform: newAddon.required ? 'translateX(18px)' : 'translateX(2px)' }} />
                </div>
                <span className="text-sm font-bold text-ink">Required selection</span>
              </label>
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-2">Options</label>
                <div className="space-y-2">
                  {newAddon.options.map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={opt.name} onChange={e => setNewAddon(p => ({ ...p, options: p.options.map((o, j) => j === i ? { ...o, name: e.target.value } : o) }))} placeholder={`Option ${i + 1}`} className="flex-1 h-10 rounded-2xl border border-[#ECEDF1] bg-white px-4 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
                      <input type="number" value={opt.price} onChange={e => setNewAddon(p => ({ ...p, options: p.options.map((o, j) => j === i ? { ...o, price: e.target.value } : o) }))} placeholder="₦0" className="w-20 h-10 rounded-2xl border border-[#ECEDF1] bg-white px-3 text-sm font-semibold outline-none focus:border-[#5B4FE8]" />
                    </div>
                  ))}
                  <button onClick={() => setNewAddon(p => ({ ...p, options: [...p.options, { name: '', price: '' }] }))} className="text-xs font-bold text-[#5B4FE8] flex items-center gap-1">
                    <Plus size={12} /> Add option
                  </button>
                </div>
              </div>
              <button onClick={addAddonGroup} disabled={!newAddon.name} className="w-full h-11 rounded-full bg-[#5B4FE8] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#4A3ED4] transition-colors">Save group</button>
            </div>
          )}

          <div className="space-y-2">
            {addons.map(group => (
              <div key={group.id} className="bg-white rounded-[20px] p-4 border border-[#ECEDF1] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-ink">{group.name}</span>
                      {group.required && <span className="text-[10px] font-extrabold bg-[#5B4FE8]/10 text-[#5B4FE8] px-2 py-0.5 rounded-full">Required</span>}
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">{group.options.length} options · {group.multi ? 'Multi-select' : 'Single select'}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-ink"><Pencil size={12} /></button>
                    <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.options.map(opt => (
                    <span key={opt.id} className="text-xs font-bold bg-[#F5F6F8] text-ink px-3 py-1.5 rounded-full">
                      {opt.name}{opt.price > 0 ? ` +₦${opt.price}` : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Style Preview Modal ──────────────────────────────────────────────────────

// ─── Template Card Preview (scaled iframe thumbnail) ──────────────────────────

const TMPL_IFRAME_W = 420;   // iframe render width – captures first phone (390px) + left padding
const TMPL_PHONE_TOP = 200;  // approx y-offset where the first phone begins in the template HTML
const TMPL_PHONE_H = 844;    // phone height per the template CSS

function TemplateCardPreview({ theme }: { theme: StorefrontTheme }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.offsetWidth / TMPL_IFRAME_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Show the top half of the phone screen so the hero + first product row is visible
  const cardH = Math.round((TMPL_PHONE_H / 2) * scale);
  const src   = `${import.meta.env.BASE_URL}styles/${theme.id}.html`;

  return (
    <div ref={ref} style={{ width: '100%', height: `${cardH}px`, overflow: 'hidden', position: 'relative' }}>
      <iframe
        src={src}
        title={theme.name}
        tabIndex={-1}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${TMPL_IFRAME_W}px`,
          height: `${TMPL_PHONE_TOP + TMPL_PHONE_H}px`,
          border: 'none',
          pointerEvents: 'none',
          transformOrigin: 'top left',
          /* scale(s) translateY(-PHONE_TOP): applied right-to-left, the
             element shifts up by PHONE_TOP in local space then scales,
             so the container window reveals the iframe starting at y=PHONE_TOP */
          transform: `scale(${scale}) translateY(-${TMPL_PHONE_TOP}px)`,
        }}
        sandbox="allow-same-origin"
        loading="lazy"
      />
    </div>
  );
}

// ─── Style Preview Modal ───────────────────────────────────────────────────────

function StylePreviewModal({
  theme,
  isSelected,
  onSelect,
  onClose,
}: {
  theme: StorefrontTheme;
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
}) {
  const accent    = theme.colors.accent;
  const accentInk = theme.colors.accentInk;
  const bg        = theme.colors.bg;
  const ink       = theme.colors.ink;
  const muted     = theme.colors.muted;
  const border    = theme.colors.border;
  const btnRadius = theme.radius.button;
  const isDark    = bg.startsWith('#0') || bg.startsWith('#1');
  const previewSrc = `${import.meta.env.BASE_URL}styles/${theme.id}.html`;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-4xl rounded-t-[28px] md:rounded-[28px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300 h-[96dvh] md:h-auto md:max-h-[92dvh]"
        style={{ background: bg }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-4 flex-none"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)', color: ink }}
          >
            <X size={18} />
          </button>

          <div className="text-center min-w-0 px-3">
            <div className="text-[10px] font-extrabold uppercase tracking-widest truncate" style={{ color: muted }}>
              {theme.category}
            </div>
            <div className="text-base font-extrabold leading-tight" style={{ color: ink }}>
              {theme.name}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: muted }}>{theme.tagline}</div>
          </div>

          {/* Colour swatches */}
          <div className="flex gap-1.5 flex-none">
            {[bg, theme.colors.surface, accent, muted].map((c, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border shadow-sm"
                style={{ background: c, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)' }}
              />
            ))}
          </div>
        </div>

        {/* ── iframe: the real HTML design ── */}
        <div className="flex-1 overflow-hidden relative min-h-0">
          {/* Scroll hint */}
          <div
            className="absolute bottom-3 right-3 z-10 text-[10px] font-bold px-2.5 py-1.5 rounded-full pointer-events-none shadow-md"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
          >
            Scroll to see all 5 screens →
          </div>
          <iframe
            key={theme.id}
            src={previewSrc}
            title={`${theme.name} storefront preview`}
            className="w-full border-none"
            style={{ display: 'block', height: '100%' }}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>

        {/* ── "Perfect for" tags + CTA ── */}
        <div className="flex-none px-5 pt-4 pb-5" style={{ borderTop: `1px solid ${border}`, background: bg }}>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {theme.perfectFor.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{ color: ink, borderColor: border, background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {isSelected ? (
            <div
              className="w-full h-13 flex items-center justify-center gap-2 font-extrabold text-sm rounded-2xl"
              style={{ background: `${accent}22`, color: accent }}
            >
              <Check size={16} /> This style is active
            </div>
          ) : (
            <button
              onClick={() => { onSelect(); onClose(); }}
              className="w-full h-13 font-extrabold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-[.98] transition-all"
              style={{
                background: accent,
                color: accentInk,
                borderRadius: btnRadius === '0px' ? '14px' : btnRadius,
                height: 52,
              }}
            >
              Use this style <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Storefront Builder ───────────────────────────────────────────────────────

function StorefrontBuilder() {
  const [step, setStep] = useState<StorefrontStep>('templates');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<StorefrontTheme | null>(null);
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [businessName, setBusinessName] = useState("Amara's Kitchen");
  const [visibleProducts, setVisibleProducts] = useState<Record<string, boolean>>({ P1: true, P2: true, P3: true, P4: false });
  const [products, setProducts] = useState<CatalogProduct[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [addons, setAddons] = useState<AddonGroup[]>(INITIAL_ADDONS);
  const [launched, setLaunched] = useState(false);
  const [copyDone, setCopyDone] = useState(false);

  const storeUrl = `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.myrelay.shop`;
  const selectedTemplateMeta = themes.find(t => t.id === selectedTemplate);
  const filteredTemplates = categoryFilter === 'All' ? themes : themes.filter(t => t.category === categoryFilter);
  const visibleCount = products.filter(p => visibleProducts[p.id] ?? true).length;

  const STEPS: { id: StorefrontStep; label: string }[] = [
    { id: 'templates', label: 'Template' },
    { id: 'customize', label: 'Customize' },
    { id: 'products',  label: 'Products' },
    { id: 'preview',   label: 'Preview' },
    { id: 'launch',    label: 'Launch' },
  ];
  const stepIndex = STEPS.findIndex(s => s.id === step);

  const handleCopy = () => { setCopyDone(true); setTimeout(() => setCopyDone(false), 2000); };

  // ── Shared two-column shell ────────────────────────────────────────────────
  const Layout = ({ children, hidePreview = false }: { children: React.ReactNode; hidePreview?: boolean }) => (
    <div className="flex-1 overflow-hidden flex">
      {/* Left: scrollable form */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-8 pb-32 space-y-6">
          {children}
        </div>
      </div>
      {/* Right: sticky phone preview */}
      {!hidePreview && (
        <div className="hidden lg:flex w-[340px] xl:w-[380px] flex-none border-l bg-gradient-to-b from-[#F5F6F8] to-[#ECEDF1] items-center justify-center p-8 flex-col gap-4">
          <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest">Live preview</p>
          <PhonePreview businessName={businessName} accentColor={accentColor} theme={selectedTemplateMeta} products={products} visibleProducts={visibleProducts} />
          {selectedTemplateMeta && (
            <p className="text-[11px] font-semibold text-muted-foreground text-center">{selectedTemplateMeta.name} template · {accentColor.label} accent</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#F5F6F8]">

      {/* Step Progress */}
      <div className="flex-none px-6 md:px-10 pt-5 pb-4 bg-white border-b">
        <div className="flex items-center w-full">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <button onClick={() => i <= stepIndex && setStep(s.id)} className={`flex items-center gap-2 text-xs font-bold transition-colors flex-none ${s.id === step ? 'text-ink' : i < stepIndex ? 'text-[#5B4FE8] cursor-pointer hover:opacity-80' : 'text-muted-foreground cursor-default'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-none shadow-sm ${i < stepIndex ? 'bg-[#5B4FE8] text-white' : s.id === step ? 'bg-ink text-white' : 'bg-[#F5F6F8] text-muted-foreground'}`}>
                  {i < stepIndex ? <Check size={11} /> : i + 1}
                </span>
                <span className="hidden md:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 rounded-full ${i < stepIndex ? 'bg-[#5B4FE8]/40' : 'bg-[#ECEDF1]'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Step 1: Template ── */}
      {step === 'templates' && (
        <Layout hidePreview>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Choose a template</h2>
            <p className="text-sm text-muted-foreground mt-1">Tap any style to preview it — your content carries over if you swap later.</p>
          </div>

          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORY_FILTERS.map(cat => <button key={cat} onClick={() => setCategoryFilter(cat)} className={pill(categoryFilter === cat)}>{cat}</button>)}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates.map(t => {
              const isDarkCard = t.colors.bg.startsWith('#0') || t.colors.bg.startsWith('#1');
              return (
                <button
                  key={t.id}
                  onClick={() => setPreviewTheme(t)}
                  className={`rounded-[24px] overflow-hidden text-left border-2 transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.99] ${selectedTemplate === t.id ? 'border-[#5B4FE8] shadow-lg ring-1 ring-[#5B4FE8]/20' : 'border-[#ECEDF1] shadow-sm'}`}
                  style={{ background: t.colors.bg }}
                  title={`Preview ${t.name}`}
                >
                  {/* Real template preview (scaled iframe) */}
                  <TemplateCardPreview theme={t} />
                  <div className="px-3.5 py-3 flex items-center justify-between" style={{ background: t.colors.bg }}>
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold leading-tight block truncate" style={{ color: t.colors.ink }}>{t.name}</span>
                      <span className="text-[9px] font-semibold" style={{ color: t.colors.muted }}>{t.tagline}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-none ml-1">
                      {selectedTemplate === t.id && (
                        <span className="w-5 h-5 rounded-full bg-[#5B4FE8] flex items-center justify-center flex-none"><Check size={10} className="text-white" /></span>
                      )}
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex-none" style={{ background: isDarkCard ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)', color: t.colors.ink }}>
                        Preview
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button disabled={!selectedTemplate} onClick={() => setStep('customize')} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg disabled:opacity-35 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors">
            Continue to Customize <ArrowRight size={18} />
          </button>
        </Layout>
      )}

      {/* ── Step 2: Customize ── */}
      {step === 'customize' && (
        <Layout>
          <button onClick={() => setStep('templates')} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2"><ChevronLeft size={15} /> Templates</button>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Customize</h2>
            <p className="text-sm text-muted-foreground mt-1">Every option in the palette keeps your store looking professional.</p>
          </div>

          {/* Logo + Cover side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-[20px] p-5 border border-[#ECEDF1] shadow-sm">
              <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Logo</div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-white text-base flex-none shadow-md" style={{ background: `linear-gradient(135deg, #4E7CF6, ${accentColor.hex})` }}>
                  {businessName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <button className="flex items-center gap-1.5 text-sm font-bold text-[#5B4FE8] hover:opacity-80 mb-1"><Upload size={13} /> Upload logo</button>
                  <p className="text-[11px] text-muted-foreground">PNG or JPG · max 5 MB</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-5 border border-[#ECEDF1] shadow-sm">
              <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-4">Cover image</div>
              <div className="h-[60px] w-full rounded-[14px] flex items-center justify-center gap-2 border-2 border-dashed border-[#ECEDF1] cursor-pointer hover:bg-[#F8F9FB] transition-colors" style={{ background: selectedTemplateMeta ? `linear-gradient(145deg, ${selectedTemplateMeta.colors.bg}, ${selectedTemplateMeta.colors.accent})` : undefined }}>
                <ImageIcon size={14} className="text-white/60" />
                <span className="text-[10px] font-bold text-white/80">Upload or use template</span>
              </div>
            </div>
          </div>

          {/* Business name */}
          <div>
            <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-2">Business name</label>
            <input value={businessName} onChange={e => setBusinessName(e.target.value)} className="w-full h-13 rounded-2xl border border-[#ECEDF1] bg-white px-5 text-base font-bold outline-none focus:ring-2 focus:ring-[#5B4FE8]/20 focus:border-[#5B4FE8] shadow-sm transition-all" data-testid="input-business-name" />
          </div>

          {/* Accent color */}
          <div>
            <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-3">Brand color</label>
            <div className="flex gap-3 flex-wrap">
              {ACCENT_COLORS.map(color => (
                <button key={color.id} onClick={() => setAccentColor(color)} title={color.label} className="relative flex-none transition-transform hover:scale-110">
                  <div className="w-11 h-11 rounded-full shadow-sm transition-all" style={{ background: color.hex, boxShadow: accentColor.id === color.id ? `0 0 0 3px white, 0 0 0 5px ${color.hex}` : '' }} />
                  {accentColor.id === color.id && <div className="absolute inset-0 flex items-center justify-center"><Check size={14} className="text-white drop-shadow-sm" /></div>}
                </button>
              ))}
            </div>
            {accentColor && <p className="text-xs font-semibold text-muted-foreground mt-2">{accentColor.label} — preview updates on the right →</p>}
          </div>

          {/* Advanced */}
          <div className="bg-white rounded-[20px] border border-[#ECEDF1] shadow-sm overflow-hidden">
            <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-5 text-sm font-bold hover:bg-[#F8F9FB] transition-colors">
              <span className="flex items-center gap-2"><Layers size={15} className="text-[#5B4FE8]" />Advanced — hero, testimonials, contact, SEO</span>
              <ChevronDown size={15} className={`text-muted-foreground transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
            {showAdvanced && (
              <div className="px-5 pb-5 space-y-4 border-t border-[#ECEDF1]">
                <p className="text-xs text-muted-foreground pt-4 leading-relaxed">All optional. Defaults are pulled from Business Settings so nothing blocks your first launch.</p>
                {[
                  { label: 'Hero banner text', hint: 'Headline customers see first' },
                  { label: 'Featured products', hint: 'Pinned to top of your storefront' },
                  { label: 'Testimonials', hint: 'Pulled from your Reviews' },
                  { label: 'Contact section', hint: 'Phone · address · hours from Business Settings' },
                  { label: 'Map pin', hint: 'From your saved address' },
                  { label: 'Social links', hint: 'Instagram, WhatsApp, Facebook…' },
                  { label: 'SEO title & description', hint: 'Controls the link preview card' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-1 border-b border-dashed border-[#ECEDF1] last:border-0">
                    <div>
                      <div className="text-sm font-bold text-ink">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.hint}</div>
                    </div>
                    <button className="text-xs font-bold text-[#5B4FE8] hover:opacity-80 flex-none">Edit ›</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setStep('products')} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors" data-testid="button-continue-products">
            Continue to Products <ArrowRight size={18} />
          </button>
        </Layout>
      )}

      {/* ── Step 3: Products ── */}
      {step === 'products' && (
        <Layout>
          <button onClick={() => setStep('customize')} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2"><ChevronLeft size={15} /> Customize</button>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Products & Menu</h2>
            <p className="text-sm text-muted-foreground mt-1">Add products, organise categories, and set up modifier groups. Editing here updates your live storefront automatically.</p>
          </div>

          {/* Sync banner */}
          <div className="flex items-start gap-3 bg-white border border-[#ECEDF1] rounded-[20px] p-4 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-lime text-ink flex items-center justify-center flex-none"><Store size={16} /></div>
            <div>
              <div className="font-bold text-sm mb-0.5">Synced with your menu</div>
              <div className="text-xs text-muted-foreground leading-relaxed">Price changes and stock updates go live instantly — no separate publish step.</div>
            </div>
          </div>

          <ProductsBuilder products={products} setProducts={setProducts} categories={categories} setCategories={setCategories} addons={addons} setAddons={setAddons} visibleProducts={visibleProducts} setVisibleProducts={setVisibleProducts} />

          <button onClick={() => setStep('preview')} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors" data-testid="button-go-preview">
            <Eye size={18} /> Preview storefront
          </button>
        </Layout>
      )}

      {/* ── Step 4: Preview ── */}
      {step === 'preview' && (
        <Layout hidePreview>
          <button onClick={() => setStep('products')} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2"><ChevronLeft size={15} /> Products</button>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Preview</h2>
            <p className="text-sm text-muted-foreground mt-1">Exactly what a customer sees. Nothing goes public until you launch.</p>
          </div>

          {/* Device frame centered */}
          <div className="flex flex-col items-center gap-4 py-4">
            <PhonePreview businessName={businessName} accentColor={accentColor} theme={selectedTemplateMeta} products={products} visibleProducts={visibleProducts} />
            <p className="text-xs text-muted-foreground text-center">{visibleCount} item{visibleCount !== 1 ? 's' : ''} visible · {accentColor.label} accent · {selectedTemplateMeta?.name ?? 'No template'}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep('customize')} className="h-12 rounded-full border border-[#ECEDF1] bg-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors shadow-sm"><Palette size={14} /> Edit branding</button>
            <button onClick={() => setStep('products')} className="h-12 rounded-full border border-[#ECEDF1] bg-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors shadow-sm"><Store size={14} /> Edit products</button>
          </div>

          <button onClick={() => setStep('launch')} className="w-full h-14 rounded-full bg-ink text-white font-extrabold flex items-center justify-center gap-2 shadow-lg hover:bg-ink/90 transition-colors" data-testid="button-go-launch">
            Looks good — Launch! <ArrowRight size={18} />
          </button>
        </Layout>
      )}

      {/* ── Style Preview Modal ── */}
      {previewTheme && (
        <StylePreviewModal
          theme={previewTheme}
          isSelected={selectedTemplate === previewTheme.id}
          onSelect={() => setSelectedTemplate(previewTheme.id)}
          onClose={() => setPreviewTheme(null)}
        />
      )}

      {/* ── Step 5: Launch ── */}
      {step === 'launch' && (
        <Layout hidePreview>
          {!launched ? (
            <>
              <button onClick={() => setStep('preview')} className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-ink -mb-2"><ChevronLeft size={15} /> Preview</button>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">Launch</h2>
                <p className="text-sm text-muted-foreground mt-1">Confirm your address then go live. Your storefront stays in sync automatically.</p>
              </div>

              {/* Subdomain */}
              <div>
                <label className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider block mb-2">Your storefront address</label>
                <div className="h-14 rounded-2xl border border-[#ECEDF1] bg-white px-5 flex items-center gap-3 shadow-sm">
                  <Globe size={15} className="text-muted-foreground flex-none" />
                  <span className="text-sm font-extrabold text-[#5B4FE8] flex-1 truncate">{storeUrl}</span>
                  <span className="text-[10px] font-extrabold text-[#27AE60] bg-[#27AE60]/10 px-2.5 py-1.5 rounded-full flex-none">Available ✓</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">Auto-generated from your business name. Editable once after launch.</p>
              </div>

              {/* What happens */}
              <div className="bg-white rounded-[20px] border border-[#ECEDF1] p-5 space-y-3 shadow-sm">
                <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">When you launch</div>
                {['Your storefront is live immediately — no waiting.', 'Every NFC tag and QR code can point straight here.', 'Menu edits update the live store automatically.', 'Customers can browse, cart, and check out.'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#27AE60]/15 text-[#27AE60] flex items-center justify-center flex-none mt-0.5"><Check size={10} /></div>
                    <span className="text-sm font-semibold text-ink leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setLaunched(true)} className="w-full h-14 rounded-full font-extrabold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity" style={{ background: accentColor.hex, color: accentColor.id === 'ink' ? '#fff' : '#16213E' }} data-testid="button-launch">
                <Globe size={18} /> Launch storefront
              </button>
            </>
          ) : (
            /* Launched state */
            <div className="flex flex-col items-center text-center space-y-6 pt-6">
              <div className="w-20 h-20 rounded-full bg-[#27AE60] flex items-center justify-center shadow-lg"><Check size={36} className="text-white" /></div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-1">You're live! 🎉</h2>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">Your storefront is public and stays in sync automatically.</p>
              </div>
              <div className="w-full bg-white rounded-[24px] p-5 border border-[#ECEDF1] shadow-sm text-left">
                <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-1">Your storefront</div>
                <div className="font-extrabold text-base text-[#5B4FE8] mb-4 break-all">{storeUrl}</div>
                <div className="flex gap-3">
                  <button onClick={handleCopy} className="flex-1 h-11 rounded-full bg-ink text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors">
                    {copyDone ? <><Check size={15} className="text-lime" /> Copied!</> : <><Copy size={15} /> Copy link</>}
                  </button>
                  <button className="flex-1 h-11 rounded-full border border-[#ECEDF1] font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors"><Share2 size={15} /> Share</button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-28 h-28 rounded-[18px] border border-[#ECEDF1] shadow-sm" style={{ background: 'repeating-conic-gradient(#16213E 0% 25%, #fff 0% 50%) 0 0/18px 18px' }} />
                <p className="text-xs text-muted-foreground">Scan to preview on your phone</p>
              </div>
              <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-[#5B4FE8] hover:opacity-80"><ExternalLink size={13} /> Open in new tab</a>
              <div className="flex gap-3 w-full">
                <button onClick={() => { setLaunched(false); setStep('templates'); setSelectedTemplate(null); }} className="flex-1 h-12 rounded-full border border-[#ECEDF1] bg-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted shadow-sm"><Palette size={14} /> Swap template</button>
                <button onClick={() => setStep('customize')} className="flex-1 h-12 rounded-full border border-[#ECEDF1] bg-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-muted shadow-sm"><ImageIcon size={14} /> Edit branding</button>
              </div>
            </div>
          )}
        </Layout>
      )}
    </div>
  );
}

// ─── Main Shop Page ───────────────────────────────────────────────────────────

export default function Orders() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const { data: onboardingData, publish: publishStore } = useOnboardingStore();
  const waStorePublished = onboardingData.published;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#F5F6F8]">

      {/* Tab switcher */}
      <div className="flex-none px-4 md:px-8 pt-4 pb-0 border-b bg-white">
        <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-extrabold border-b-2 transition-all whitespace-nowrap flex-none ${
              activeTab === 'orders'
                ? 'border-ink text-ink'
                : 'border-transparent text-muted-foreground hover:text-ink'
            }`}
            data-testid="tab-orders"
          >
            <ShoppingCart size={15} /> Orders
          </button>
          <button
            onClick={() => setActiveTab('storefront')}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-extrabold border-b-2 transition-all whitespace-nowrap flex-none ${
              activeTab === 'storefront'
                ? 'border-ink text-ink'
                : 'border-transparent text-muted-foreground hover:text-ink'
            }`}
            data-testid="tab-storefront"
          >
            <Store size={15} /> Storefront
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-extrabold border-b-2 transition-all whitespace-nowrap flex-none ${
              activeTab === 'whatsapp'
                ? 'text-white rounded-t-xl -mb-px'
                : 'border-transparent text-muted-foreground hover:text-ink'
            }`}
            style={activeTab === 'whatsapp' ? { background: '#25D366', borderColor: '#25D366' } : {}}
            data-testid="tab-whatsapp"
          >
            <MessageCircle size={15} /> WhatsApp Shopping
            {activeTab !== 'whatsapp' && (
              <span className="ml-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full text-white" style={{ background: '#25D366' }}>
                New
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'orders'     && <OrdersKanban />}
        {activeTab === 'storefront' && <StorefrontBuilder />}
        {activeTab === 'whatsapp'   && (
          waStorePublished
            ? <WhatsAppShoppingExperience />
            : <OnboardingWizard onPublished={() => publishStore()} />
        )}
      </div>
    </div>
  );
}
