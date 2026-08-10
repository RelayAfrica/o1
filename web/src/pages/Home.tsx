import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, ShoppingBag, Users, 
  AlertCircle, Activity, Package
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/data';

const overviewData = [
  { name: '1', value: 1200 },
  { name: '5', value: 2100 },
  { name: '10', value: 1800 },
  { name: '15', value: 3200 },
  { name: '20', value: 2800 },
  { name: '25', value: 4100 },
  { name: '30', value: 4250 },
];

const weeklyData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 140 },
  { name: 'Fri', value: 280 },
  { name: 'Sat', value: 210 },
  { name: 'Sun', value: 240 },
];

const analyticData = [
  { name: 'Week 1', revenue: 840, target: 1000 },
  { name: 'Week 2', revenue: 920, target: 1000 },
  { name: 'Week 3', revenue: 1100, target: 1000 },
  { name: 'Week 4', revenue: 1390, target: 1000 },
];

const topMovers = [
  { name: 'Jollof Rice Combo', qty: 142, revenue: '₦639,000' },
  { name: 'Grilled Chicken', qty: 86, revenue: '₦258,000' },
  { name: 'Fresh Salad', qty: 45, revenue: '₦112,500' },
];

export default function Home() {
  const [timeRange, setTimeRange] = useState('Overview');

  const heroContent = {
    Overview: {
      label: "Total Revenue",
      period: "July 2026",
      value: "₦4,250,000",
      trend: "+14.2%",
      trendLabel: "vs last month",
      trendUp: true
    },
    Weekly: {
      label: "This Week's Revenue",
      period: "Jul 14 - 20",
      value: "₦845,000",
      trend: "+5.1%",
      trendLabel: "vs last week",
      trendUp: true
    },
    Analytic: {
      label: "Projected Revenue",
      period: "Q3 2026",
      value: "₦12,800,000",
      trend: "-2.4%",
      trendLabel: "vs target",
      trendUp: false
    }
  }[timeRange as 'Overview' | 'Weekly' | 'Analytic'];

  const DonutChart = () => (
    <div className="relative w-36 h-36 rounded-full flex items-center justify-center mx-auto" 
         style={{ background: 'conic-gradient(hsl(var(--color-lime)) 0% 60%, hsl(var(--color-lime-pale)) 60% 85%, hsl(var(--color-ink)) 85% 100%)' }}>
      <div className="absolute inset-5 bg-card rounded-full flex items-center justify-center flex-col shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]">
        <span className="text-2xl font-extrabold leading-none mt-1 text-ink">2.4k</span>
        <span className="text-[10px] font-bold text-muted-foreground mt-1">Total</span>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">Revenue Trend</h3>
            <select className="bg-muted text-xs font-bold px-4 py-2 rounded-full outline-none text-ink cursor-pointer border-none appearance-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[260px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overviewData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradient-lime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--color-lime))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--color-lime))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 700 }} dy={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-soft)', fontWeight: 700, fontSize: '13px', backgroundColor: 'hsl(var(--card))' }}
                  itemStyle={{ color: 'hsl(var(--ink))', fontWeight: 800 }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--color-lime))" strokeWidth={4} fillOpacity={1} fill="url(#gradient-lime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-extrabold text-ink">Recent Orders</h3>
            <button className="text-xs font-bold text-lime hover:underline" aria-label="View all recent orders">View All</button>
          </div>
          <div className="space-y-3">
            {MOCK_ORDERS.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3.5 rounded-[20px] hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[14px] bg-muted flex items-center justify-center text-ink flex-none shadow-sm">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold truncate max-w-[140px] md:max-w-[200px] text-ink">{order.customer}</div>
                    <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">{order.time || order.date} • {order.items} items</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-extrabold text-ink">₦{order.amount.toLocaleString()}</div>
                  <div className="flex items-center gap-1.5 justify-end mt-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      order.stage === 'New' ? 'bg-warning' : 
                      order.stage === 'Completed' ? 'bg-success' : 'bg-lime'
                    }`}></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{order.stage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <h3 className="text-base font-extrabold mb-5 text-ink">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-3 bg-muted p-5 rounded-2xl hover:bg-lime/20 hover:shadow-sm transition-all text-ink group border border-transparent hover:border-lime/20" aria-label="New Order">
              <div className="w-12 h-12 rounded-full bg-card shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform"><ShoppingBag size={20}/></div>
              <span className="text-xs font-extrabold">New Order</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 bg-muted p-5 rounded-2xl hover:bg-lime/20 hover:shadow-sm transition-all text-ink group border border-transparent hover:border-lime/20" aria-label="Add Customer">
              <div className="w-12 h-12 rounded-full bg-card shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform"><Users size={20}/></div>
              <span className="text-xs font-extrabold">Customer</span>
            </button>
          </div>
        </div>

        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <div className="flex items-center gap-2.5 mb-5">
            <AlertCircle size={18} className="text-warning" />
            <h3 className="text-base font-extrabold text-ink">Needs Attention</h3>
          </div>
          <div className="space-y-3">
            {MOCK_PRODUCTS.filter(p => p.status !== 'Active').map(p => (
               <div key={p.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-warning/5 border border-warning/15">
                 <div className="flex items-center gap-3.5">
                   <div className="w-10 h-10 rounded-[12px] bg-warning/10 text-warning flex items-center justify-center flex-none">
                     <Package size={16} />
                   </div>
                   <div>
                     <p className="text-[13px] font-extrabold text-ink leading-tight">{p.name}</p>
                     <p className="text-[10px] font-bold text-warning mt-0.5">{p.status}</p>
                   </div>
                 </div>
                 <button className="text-[10px] font-extrabold text-ink bg-card px-3 py-1.5 rounded-full shadow-sm hover:bg-warning hover:text-white transition-colors">Resolve</button>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeekly = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">This Week's Activity</h3>
            <div className="text-[11px] font-extrabold text-muted-foreground bg-muted px-4 py-2 rounded-full">
              Avg ₦120k / day
            </div>
          </div>
          <div className="h-[260px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 700 }} dy={10} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-soft)', fontWeight: 700, fontSize: '13px', backgroundColor: 'hsl(var(--card))' }}
                  itemStyle={{ color: 'hsl(var(--ink))', fontWeight: 800 }}
                />
                <Bar dataKey="value" radius={[8, 8, 4, 4]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Fri' ? 'hsl(var(--color-lime))' : 'hsl(var(--color-ink-2))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <h3 className="text-base font-extrabold mb-6 text-ink">Top Movers This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topMovers.map((item, i) => (
               <div key={i} className="flex items-center justify-between p-4.5 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-border/50 cursor-default">
                 <div>
                   <p className="text-[13px] font-extrabold text-ink">{item.name}</p>
                   <p className="text-[11px] font-bold text-muted-foreground mt-0.5">{item.qty} orders</p>
                 </div>
                 <span className="text-[13px] font-extrabold text-ink">{item.revenue}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[linear-gradient(135deg,#5B4FE8,#16213E)] rounded-[28px] p-6 md:p-8 shadow-soft text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>
          <h3 className="text-base font-extrabold mb-1 relative z-10">Busiest Day</h3>
          <p className="text-[13px] font-medium text-white/70 mb-8 relative z-10">You're tracking highest on</p>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-[40px] font-extrabold tracking-tight leading-none">Friday</span>
          </div>
          <Activity className="absolute right-6 bottom-6 opacity-10 text-white" size={80} />
        </div>

        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <h3 className="text-base font-extrabold mb-6 text-ink">Customer Mix</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold mb-2.5 text-ink">
                <span>Returning</span>
                <span>68%</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-ink rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold mb-2.5 text-ink">
                <span>New</span>
                <span>32%</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-lime rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytic = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">Performance vs Target</h3>
            <div className="flex items-center gap-5 text-[11px] font-extrabold text-muted-foreground bg-muted px-4 py-2 rounded-full">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-lime"></div>Actual</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"></div>Target</div>
            </div>
          </div>
          <div className="h-[260px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 700 }} dy={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-soft)', fontWeight: 700, fontSize: '13px', backgroundColor: 'hsl(var(--card))' }}
                  itemStyle={{ color: 'hsl(var(--ink))', fontWeight: 800 }}
                />
                <Area type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--color-lime))" strokeWidth={4} fillOpacity={0.15} fill="hsl(var(--color-lime))" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50">
             <h3 className="text-base font-extrabold mb-6 text-ink">Top Categories</h3>
             <div className="space-y-5">
                {[
                  { name: 'Hot Meals', val: '64%' },
                  { name: 'Cold Drinks', val: '22%' },
                  { name: 'Desserts', val: '14%' }
                ].map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-[11px] font-extrabold mb-2 text-ink uppercase tracking-wide">
                      <span>{cat.name}</span>
                      <span>{cat.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-ink rounded-full" style={{ width: cat.val }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50 flex flex-col justify-center">
            <h3 className="text-base font-extrabold mb-2 text-ink">Customer LTV</h3>
            <p className="text-[13px] font-medium text-muted-foreground mb-6">Average lifetime value per customer</p>
            <div className="text-4xl font-extrabold text-ink tracking-tight">₦42,500</div>
            <div className="flex items-center gap-1.5 mt-3 text-lime font-bold text-[11px] bg-lime/10 w-fit px-3 py-1.5 rounded-full">
              <TrendingUp size={14} />
              <span>Up 8% this quarter</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-card rounded-[28px] p-6 md:p-8 shadow-soft border border-border/50 flex flex-col h-full">
          <h3 className="text-base font-extrabold mb-6 text-ink">Goal Progress</h3>
          <div className="bg-lime-pale/40 p-5 rounded-[20px] mb-8 border border-lime-pale/50">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[13px] font-extrabold text-ink">Q4 Revenue Target</span>
              <span className="text-[13px] font-extrabold text-ink">85%</span>
            </div>
            <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-lime rounded-full w-[85%]"></div>
            </div>
            <p className="text-[11px] font-bold text-muted-foreground mt-3">₦12.8M of ₦15M target reached</p>
          </div>

          <h3 className="text-base font-extrabold mb-6 text-ink">Audience Base</h3>
          <div className="flex-1 flex flex-col items-center justify-center gap-8 py-4">
            <DonutChart />
            <div className="flex flex-wrap justify-center gap-5 text-[11px] font-extrabold text-muted-foreground w-full">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-lime"></div>Active</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-lime-pale"></div>New</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-ink"></div>Inactive</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 space-y-8 bg-background">
      
      {/* Header Card */}
      <div className="bg-[linear-gradient(135deg,#16213E,#1B2942)] rounded-[28px] p-8 md:p-10 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(22,33,62,0.12)] transition-all duration-500">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[13px] font-extrabold text-white/80 uppercase tracking-wide">Amara's Kitchen</span>
              <span className="px-3.5 py-1.5 bg-white/10 rounded-full text-[11px] font-extrabold backdrop-blur-md border border-white/5">{heroContent.period}</span>
            </div>
            <p className="text-white/70 text-sm font-bold mb-2 tracking-wide">{heroContent.label}</p>
            <h2 className="text-4xl md:text-[56px] font-extrabold tracking-tight leading-none">{heroContent.value}</h2>
          </div>
          
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full self-start md:self-auto border border-white/5 shadow-sm">
            {heroContent.trendUp ? <TrendingUp size={18} className="text-lime" /> : <TrendingDown size={18} className="text-destructive" />}
            <span className={`text-sm font-extrabold ${heroContent.trendUp ? 'text-lime' : 'text-destructive'}`}>{heroContent.trend}</span>
            <span className="text-xs text-white/70 font-bold ml-1">{heroContent.trendLabel}</span>
          </div>
        </div>
      </div>

      {/* Segmented Toggle */}
      <div className="flex p-1.5 bg-muted/80 backdrop-blur-sm rounded-full w-full max-w-[380px] mx-auto md:mx-0 shadow-inner border border-border/50">
        {['Overview', 'Weekly', 'Analytic'].map(tab => (
          <button
            key={tab}
            onClick={() => setTimeRange(tab)}
            aria-label={`Switch to ${tab} view`}
            className={`flex-1 py-2.5 text-[13px] font-extrabold rounded-full transition-all duration-300 ${
              timeRange === tab 
                ? 'bg-lime text-ink shadow-[0_6px_14px_rgba(126,211,33,0.35)] scale-100' 
                : 'text-muted-foreground hover:text-foreground scale-95 hover:scale-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {timeRange === 'Overview' && renderOverview()}
        {timeRange === 'Weekly' && renderWeekly()}
        {timeRange === 'Analytic' && renderAnalytic()}
      </div>

    </div>
  );
}
