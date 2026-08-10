import React, { useState } from 'react';
import { Home, Users, Megaphone, Store, MoreHorizontal, Bell, Search, Plus, X, Menu, Settings, HelpCircle, CreditCard, ChevronRight, LogOut, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { MOCK_NOTIFICATIONS } from '@/lib/data';

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Customers', icon: Users, path: '/customers' },
    { label: 'Marketing', icon: Megaphone, path: '/marketing' },
    { label: 'Shop', icon: Store, path: '/orders' },
    { label: 'More', icon: MoreHorizontal, path: '/more' },
  ];

  const getPageTitle = () => {
    if (location === '/') return 'Dashboard';
    const item = navItems.find(n => n.path === location);
    return item ? item.label : 'Relay';
  };

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden relative text-foreground">
      
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex w-64 flex-col border-r bg-card h-full pt-6 pb-4 px-4 flex-none">
        <div className="flex items-center gap-3 mb-8 px-2">
          <img src="/logo.png" alt="Relay" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold text-lg">Relay</span>
        </div>
        
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-lime text-ink shadow-[0_8px_18px_rgba(126,211,33,0.3)]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto bg-muted rounded-2xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lime-light to-lime flex items-center justify-center text-ink font-bold text-sm">AO</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold truncate">Amara's Kitchen</div>
            <div className="text-[10px] text-muted-foreground truncate">Growth Plan</div>
          </div>
        </div>
      </aside>

      {/* Tablet Rail */}
      <aside className="hidden md:flex xl:hidden w-20 flex-col items-center border-r bg-card h-full py-6 flex-none">
        <img src="/logo.png" alt="Relay" className="w-10 h-10 rounded-xl object-cover mb-8" />
        
        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path} title={item.label} className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-colors ${isActive ? 'bg-lime text-ink shadow-[0_8px_18px_rgba(126,211,33,0.3)]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <Icon size={22} />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b bg-card/80 backdrop-blur-md sticky top-0 z-20 flex-none">
          <h1 className="text-xl md:text-2xl font-extrabold">{getPageTitle()}</h1>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSearch(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-card shadow-soft text-ink hover:bg-muted transition-colors"
            >
              <Search size={18} />
            </button>
            <button 
              onClick={() => setShowNotifications(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-card shadow-soft text-ink hover:bg-muted transition-colors relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-lime text-ink text-[9px] font-extrabold flex items-center justify-center rounded-full border-2 border-card">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden absolute bottom-4 left-4 right-4 bg-card rounded-full shadow-[0_10px_30px_rgba(22,33,62,0.18)] flex items-stretch justify-between p-1.5 z-40">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-full text-[10px] font-bold transition-colors ${isActive ? 'bg-lime text-ink' : 'text-muted-foreground'}`}>
              <Icon size={20} />
              <span className="truncate max-w-full px-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FAB Menu */}
      {(location === '/' || location === '/customers' || location === '/orders') && (
        <div className="absolute bottom-24 right-4 md:bottom-8 md:right-8 z-30">
          <button 
            onClick={() => setShowFabMenu(!showFabMenu)}
            className={`w-14 h-14 bg-ink text-white rounded-full flex items-center justify-center shadow-[0_10px_24px_rgba(22,33,62,0.35)] transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`}
          >
            <Plus size={28} />
          </button>
          
          {showFabMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowFabMenu(false)} />
              <div className="absolute bottom-20 right-0 w-56 bg-card rounded-3xl p-3 shadow-[0_20px_50px_rgba(22,33,62,0.3)] z-30 flex flex-col gap-1 animate-in slide-in-from-bottom-5">
                <button className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted font-bold text-sm text-left transition-colors" onClick={() => setShowFabMenu(false)}>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-ink"><ShoppingBag size={18}/></div>
                  New Order
                </button>
                <button className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted font-bold text-sm text-left transition-colors" onClick={() => setShowFabMenu(false)}>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-ink"><Users size={18}/></div>
                  Add Customer
                </button>
                <button className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted font-bold text-sm text-left transition-colors" onClick={() => setShowFabMenu(false)}>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-ink"><Megaphone size={18}/></div>
                  Create Campaign
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col animate-in fade-in">
          <div className="h-16 border-b flex items-center px-4 gap-3 bg-card">
            <Search className="text-muted-foreground flex-none" size={20} />
            <input 
              autoFocus
              type="text" 
              placeholder="Search customers, orders, products..." 
              className="flex-1 bg-transparent border-none outline-none font-medium text-base"
            />
            <button onClick={() => setShowSearch(false)} className="w-10 h-10 flex items-center justify-center bg-muted rounded-full text-ink flex-none">
              <X size={20} />
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="text-sm font-bold text-muted-foreground mb-4">Recent Searches</h3>
            <div className="flex flex-col gap-3">
              {['Amara Okafor', 'Jollof Rice', 'ORD-002'].map(s => (
                <div key={s} className="flex items-center gap-3 text-sm font-bold cursor-pointer hover:text-lime">
                  <Search size={16} className="text-muted-foreground" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm animate-in fade-in" onClick={() => setShowNotifications(false)}>
          <div 
            className="w-full max-w-sm h-full bg-card shadow-2xl flex flex-col animate-in slide-in-from-right-full" 
            onClick={e => e.stopPropagation()}
          >
            <div className="h-16 border-b flex items-center justify-between px-6 bg-card flex-none">
              <h2 className="font-extrabold text-lg">Notifications</h2>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs font-bold text-lime-dark bg-lime-pale px-3 py-1.5 rounded-full">
                    Mark read
                  </button>
                )}
                <button onClick={() => setShowNotifications(false)} className="w-8 h-8 flex items-center justify-center bg-muted rounded-full text-ink">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl flex items-start gap-3 transition-colors ${n.read ? 'bg-background' : 'bg-lime-pale/30 border border-lime-pale'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-none ${n.read ? 'bg-muted text-muted-foreground' : 'bg-lime text-ink'}`}>
                    {n.type === 'order' && <ShoppingBag size={18} />}
                    {n.type === 'stock' && <Bell size={18} />}
                    {n.type === 'campaign' && <Megaphone size={18} />}
                    {n.type === 'appointment' && <Users size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${n.read ? 'font-medium' : 'font-bold'} leading-snug`}>{n.title}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{n.time}</span>
                  </div>
                  {!n.read && <div className="w-2.5 h-2.5 rounded-full bg-lime mt-1.5 flex-none" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}