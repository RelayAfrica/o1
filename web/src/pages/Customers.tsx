import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CUSTOMERS, MOCK_TIMELINE } from '@/lib/data';
import { Search, Phone, MessageCircle, Mail, MapPin, Plus, Clock, Star, Users, ShoppingBag, Smartphone, Wallet, TrendingUp, X, Edit3, Download, Filter, Banknote } from 'lucide-react';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState<typeof MOCK_CUSTOMERS[0] | null>(null);

  const filters = ['All', 'Hot', 'Permanent', 'New', 'VIP'];
  
  const filteredCustomers = useMemo(() => {
    return MOCK_CUSTOMERS.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                            c.email.toLowerCase().includes(search.toLowerCase()) || 
                            c.phone.includes(search);
      const matchesFilter = filter === 'All' ? true : 
                            filter === 'VIP' ? c.tags.includes('VIP') : 
                            c.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const openDrawer = (customer: typeof MOCK_CUSTOMERS[0]) => {
    setActiveCustomer(customer);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    // Delay clearing the data so the exit animation stays populated
    setTimeout(() => setActiveCustomer(null), 300);
  };

  // Close drawer on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getAvatarColor = (index: number) => {
    const styles = [
      'bg-lime-pale text-lime-dark',
      'bg-[#E5E9F2] text-[#4E7CF6]', 
      'bg-[#FCE7F0] text-[#E83D7C]', 
      'bg-[#FFF1DE] text-[#C87F0A]', 
      'bg-ink/10 text-ink'
    ];
    return styles[index % styles.length];
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-surface-alt/30 relative">
      
      {/* Scrollable Main Area */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Gallery Header */}
        <div className="bg-card border-b border-border/50 px-4 md:px-8 py-8 md:py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-2">Customers</h1>
              <p className="text-muted-foreground font-semibold text-[15px]">
                You have <span className="text-ink font-extrabold">1,240</span> total customers. <span className="text-lime-dark">42 joined this week.</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-12 px-5 md:px-6 bg-surface-alt text-ink font-bold rounded-full hover:bg-muted transition-colors flex items-center gap-2">
                <Download size={18} /> <span className="hidden sm:inline">Export</span>
              </button>
              <button className="h-12 px-5 md:px-6 bg-ink text-white font-bold rounded-full hover:bg-ink-2 transition-colors flex items-center gap-2 shadow-soft">
                <Plus size={18} /> <span>Add Customer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar (Search & Filters) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center sticky top-0 z-10 bg-surface-alt/80 backdrop-blur-md">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-card rounded-full border border-border/50 outline-none font-semibold text-[15px] focus:ring-2 focus:ring-lime focus:border-transparent transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all flex-none ${
                  filter === f 
                    ? 'bg-ink text-white shadow-md' 
                    : 'bg-card text-muted-foreground border border-border/50 hover:bg-muted'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Area */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
          {filteredCustomers.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-[28px] bg-card border border-border/50 shadow-sm flex items-center justify-center mb-6 rotate-3">
                <Users size={32} className="text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-extrabold text-ink mb-2">No customers found</h3>
              <p className="text-[15px] font-medium text-muted-foreground max-w-sm">We couldn't find any customers matching your search or filter. Try adjusting your criteria.</p>
              <button onClick={() => {setSearch(''); setFilter('All');}} className="mt-6 px-6 py-2.5 bg-ink text-white font-bold rounded-full hover:bg-ink-2 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filteredCustomers.map((customer, idx) => (
                <div 
                  key={customer.id} 
                  onClick={() => openDrawer(customer)}
                  className="bg-card rounded-[28px] p-5 md:p-6 shadow-sm hover:shadow-md border border-border/40 hover:border-lime/50 transition-all cursor-pointer flex flex-col gap-5 relative group"
                >
                  {/* Top: Avatar & Action */}
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-xl ${getAvatarColor(idx)}`}>
                      {customer.avatar}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-0.5">Total Spent</div>
                      <div className="font-extrabold text-ink text-lg">₦{customer.spent.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  {/* Middle: Name & Tags */}
                  <div>
                    <h3 className="font-extrabold text-[17px] text-ink truncate mb-2">{customer.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 bg-lime-pale/60 text-lime-dark text-[10px] font-extrabold uppercase tracking-wider rounded-full">{customer.status}</span>
                      {customer.tags.slice(0,2).map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 bg-surface-alt text-muted-foreground text-[10px] font-extrabold uppercase tracking-wider rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-full bg-border/50"></div>

                  {/* Bottom: Info */}
                  <div className="flex items-center justify-between text-[12px] font-bold text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-ink/40" /> {customer.lastOrder}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-[#C87F0A]" fill="currentColor" /> {customer.loyaltyPoints}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeDrawer}
      />

      {/* Profile Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[60] w-full md:w-[480px] bg-background shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {activeCustomer && (
          <>
            {/* Drawer Header */}
            <div className="px-6 pb-6 pt-6 relative border-b border-border/50 bg-card flex-none">
              <div className="flex justify-between items-center mb-6">
                <button onClick={closeDrawer} className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-ink hover:bg-muted transition-colors">
                  <X size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-ink hover:bg-muted transition-colors">
                  <Edit3 size={18} />
                </button>
              </div>
              
              <div className="flex gap-5 items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-3xl shadow-sm flex-none ${getAvatarColor(MOCK_CUSTOMERS.findIndex(c => c.id === activeCustomer.id))}`}>
                  {activeCustomer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-extrabold text-ink mb-2 truncate">{activeCustomer.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-lime-pale text-lime-dark rounded-full text-[11px] font-extrabold uppercase tracking-wider">{activeCustomer.status}</span>
                    {activeCustomer.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-surface-alt text-muted-foreground rounded-full text-[11px] font-extrabold uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="flex items-center justify-center gap-2 py-3.5 bg-ink text-white font-bold rounded-xl hover:bg-ink-2 transition-colors shadow-md text-[14px]">
                  <MessageCircle size={18} className="text-lime" /> WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 py-3.5 bg-surface-alt text-ink font-bold rounded-xl hover:bg-muted transition-colors border border-border/50 text-[14px]">
                  <Phone size={18} /> Call
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-surface-alt/30">
              
              {/* Contact Details */}
              <div>
                <h3 className="text-[12px] font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Contact Details</h3>
                <div className="bg-card rounded-[24px] p-5 shadow-sm border border-border/50 space-y-4">
                  <div className="flex items-center gap-3.5 text-[15px] font-semibold text-ink">
                    <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-muted-foreground flex-none"><Phone size={14} /></div>
                    {activeCustomer.phone}
                  </div>
                  <div className="flex items-center gap-3.5 text-[15px] font-semibold text-ink">
                    <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-muted-foreground flex-none"><Mail size={14} /></div>
                    <span className="truncate">{activeCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3.5 text-[15px] font-semibold text-ink">
                    <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-muted-foreground flex-none"><MapPin size={14} /></div>
                    Lagos, Nigeria
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-card rounded-[24px] p-5 shadow-sm border border-border/50 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Banknote size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Spent</span>
                  </div>
                  <div className="text-xl font-extrabold text-ink tracking-tight">₦{activeCustomer.spent.toLocaleString()}</div>
                </div>
                <div className="bg-card rounded-[24px] p-5 shadow-sm border border-border/50 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Wallet size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Wallet</span>
                  </div>
                  <div className="text-xl font-extrabold text-ink tracking-tight">₦{activeCustomer.walletBalance.toLocaleString()}</div>
                </div>
                <div className="bg-[#FFF1DE] rounded-[24px] p-5 shadow-sm border border-[#FFE885]/50 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[#C87F0A] mb-2">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Points</span>
                  </div>
                  <div className="text-xl font-extrabold text-[#C87F0A] tracking-tight">{activeCustomer.loyaltyPoints}</div>
                </div>
                <div className="bg-card rounded-[24px] p-5 shadow-sm border border-border/50 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <TrendingUp size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Avg Order</span>
                  </div>
                  <div className="text-xl font-extrabold text-ink tracking-tight">₦{(activeCustomer.spent / 8).toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                </div>
              </div>

              {/* Notes */}
              {activeCustomer.notes && (
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-[12px] font-extrabold text-muted-foreground uppercase tracking-wider">Pinned Note</h3>
                    <button className="text-[12px] font-bold text-ink hover:text-lime-dark transition-colors">Edit</button>
                  </div>
                  <div className="bg-[#FFF8CC] rounded-[24px] p-5 shadow-sm border border-[#FFE885]/50">
                    <p className="text-[15px] font-semibold text-[#5A4906] leading-relaxed">{activeCustomer.notes}</p>
                  </div>
                </div>
              )}

              {/* Timeline Section */}
              <div className="pb-8">
                <div className="flex items-center justify-between mb-5 px-1">
                  <h3 className="text-[12px] font-extrabold text-muted-foreground uppercase tracking-wider">Activity Timeline</h3>
                  <button className="text-[12px] font-bold text-ink hover:text-lime-dark transition-colors flex items-center gap-1 bg-surface-alt px-2.5 py-1 rounded-full">
                    <Filter size={12} /> Filter
                  </button>
                </div>
                <div className="bg-card rounded-[28px] p-6 shadow-sm border border-border/50">
                  <div className="space-y-7">
                    {MOCK_TIMELINE.map((event, i) => (
                      <div key={event.id} className="flex gap-4 relative group">
                        {i !== MOCK_TIMELINE.length - 1 && (
                          <div className="absolute left-[19px] top-[44px] bottom-[-28px] w-[2px] bg-surface-alt group-hover:bg-border transition-colors"></div>
                        )}
                        <div className="w-10 h-10 rounded-full bg-surface-alt border-4 border-card flex items-center justify-center flex-none z-10 text-ink">
                          {event.icon === 'ShoppingBag' && <ShoppingBag size={14} />}
                          {event.icon === 'Globe' && <MapPin size={14} />}
                          {event.icon === 'Mail' && <Mail size={14} />}
                          {event.icon === 'Smartphone' && <Smartphone size={14} />}
                        </div>
                        <div className="pt-1.5 flex-1">
                          <p className="text-[14px] font-bold text-ink leading-snug mb-0.5">{event.title}</p>
                          <p className="text-[12px] font-semibold text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </div>

    </div>
  );
}
