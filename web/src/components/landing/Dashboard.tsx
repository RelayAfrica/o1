import React from "react";

const dashboardStyles = `
  .dashboard { background: white; border-radius: 20px; border: 1px solid var(--line, #E5E7EB); box-shadow: 0 8px 40px -8px rgba(0,0,0,0.16); overflow: hidden; }
  .dashboard-top { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--line, #E5E7EB); gap: 12px; flex-wrap: wrap; }
  .dashboard-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; color: var(--ink, #0D0D0D); }
  .db-mini-mark { width: 20px; height: 20px; border-radius: 6px; background: var(--green, #3BB741); display: grid; place-items: center; color: white; font-size: 10px; font-weight: 800; overflow: hidden; }
  .db-mini-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .dashboard-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; color: var(--muted, #888888); font-size: 12px; }
  .db-pill { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid var(--line, #E5E7EB); border-radius: 999px; color: var(--body, #555555); background: white; }
  .dashboard-body { display: flex; min-height: 480px; }
  .db-sidebar { width: 130px; flex-shrink: 0; border-right: 1px solid var(--line, #E5E7EB); padding: 14px 0; background: #fcfcfc; display: flex; flex-direction: column; }
  .db-sidebar-note { padding: 0 12px; margin-bottom: 10px; font-size: 10px; color: var(--muted, #888); line-height: 1.4; }
  .db-nav-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; font-size: 12px; color: var(--body, #555); cursor: pointer; margin: 2px 8px; border-radius: 6px; }
  .db-nav-item.active { background: var(--green-pale, #EBF7EC); color: var(--green, #3BB741); font-weight: 600; }
  .db-main-panel { flex: 1; padding: 14px; overflow: hidden; background: linear-gradient(180deg, white 0%, #f7f8f7 100%); }
  .db-stat-grid, .db-stat-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
  .db-stat-grid { margin-bottom: 14px; }
  .db-stat-row { margin-bottom: 14px; }
  .db-stat-card { padding: 10px; border-radius: 6px; border: 1px solid var(--line, #E5E7EB); background: white; min-height: 86px; display: flex; flex-direction: column; justify-content: space-between; }
  .db-stat-card .db-label { font-size: 10px; color: var(--muted, #888); margin-bottom: 4px; }
  .db-stat-card .db-value { font-size: 20px; font-weight: 800; color: var(--ink, #0D0D0D); line-height: 1.1; }
  .db-sidebar-footer { margin-top: auto; padding: 10px 12px 2px; border-top: 1px solid var(--line, #E5E7EB); }
  .db-sidebar-footer-item { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted, #888); padding: 6px 0; }
  .db-service-overview { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 6px; }
  .db-service-legend { display: grid; gap: 8px; width: 100%; }
  .db-legend-item { display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: var(--body, #555); }
  .db-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
  .db-legend-dot.green { background: var(--green, #3BB741); }
  .db-legend-dot.amber { background: #F59E0B; }
  .db-legend-dot.blue { background: #3B82F6; }
  .db-legend-dot.red { background: #EF4444; }
  .db-delta { margin-top: 6px; display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: var(--green, #2E9A34); font-weight: 600; }
  .db-delta.negative { color: #EF4444; }
  .db-bottom-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .db-panel-card { border: 1px solid var(--line, #E5E7EB); border-radius: 6px; background: white; padding: 10px; }
  .db-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 11px; font-weight: 700; color: var(--ink, #0D0D0D); }
  .db-panel-head a { color: var(--green, #3BB741); font-weight: 600; text-decoration: none; }
  .db-queue-row, .db-service-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid var(--line, #E5E7EB); font-size: 11px; color: var(--body, #555); }
  .db-queue-btn { margin-top: 8px; width: 100%; background: var(--green, #3BB741); color: white; border: none; padding: 6px; border-radius: 6px; font-size: 10px; font-weight: 700; cursor: pointer; }
  @media (max-width: 768px) {
    .dashboard-body { flex-direction: column; }
    .db-sidebar { display: none; }
    .db-stat-grid, .db-stat-row, .db-bottom-row { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .db-stat-grid, .db-stat-row, .db-bottom-row { grid-template-columns: 1fr; }
  }
`;

export default function Dashboard() {
  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="mt-10 dashboard">
        {/* Top bar */}
        <div className="dashboard-top">
          <div className="dashboard-brand">
            <div className="db-mini-mark">
              <img src="https://i.ibb.co/RTPk7xqp/elay.png" alt="Relay logo" />
            </div>
            Relay
            <span style={{ color: "var(--muted, #888)", marginLeft: 6, fontWeight: 500 }}>Dashboard</span>
          </div>
          <div className="dashboard-meta">
            <span>Aug 24, 2026</span>
            <span className="db-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 9h18" />
              </svg>
              Calendar
            </span>
            <span className="db-pill">
              All Branches
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
            <div className="db-mini-mark" style={{ width: 26, height: 26, borderRadius: "50%", fontSize: 12 }}>A</div>
          </div>
        </div>

        {/* Body */}
        <div className="dashboard-body">
          {/* Sidebar */}
          <div className="db-sidebar">
            <div className="db-sidebar-note"></div>
            <div className="db-nav-item active">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 13h10" /><path d="M7 17h6" /></svg>
              Overview
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 14a7 7 0 0 1 14 0" /></svg>
              Customers
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 7h12" /><path d="M6 12h12" /><path d="M6 17h8" /></svg>
              Queues
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 7h14" /><path d="M5 12h14" /><path d="M5 17h14" /></svg>
              Orders
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M8 11h8" /><path d="M8 15h5" /></svg>
              Appointments
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16" /><path d="M12 4v16" /></svg>
              Campaigns
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 19V9" /><path d="M12 19V5" /><path d="M19 19v-7" /></svg>
              Analytics
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M5 19a7 7 0 0 1 14 0" /></svg>
              Staff
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16" /><path d="M4 16h16" /><path d="M8 4v16" /><path d="M16 4v16" /></svg>
              Branches
            </div>
            <div className="db-nav-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
              Settings
            </div>
            <div className="db-sidebar-footer">
              <div className="db-sidebar-footer-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 8h10" /><path d="M7 12h10" /><path d="M7 16h6" /></svg>
                Support
              </div>
            </div>
          </div>

          {/* Main panel */}
          <div className="db-main-panel">
            {/* Stat row 1 */}
            <div className="db-stat-grid">
              <div className="db-stat-card"><div className="db-label">Total Customers</div><div className="db-value">432</div><div className="db-delta">↑ 16.8% vs yesterday</div></div>
              <div className="db-stat-card"><div className="db-label">In Queue</div><div className="db-value">27</div><div className="db-delta">4 Live</div></div>
              <div className="db-stat-card"><div className="db-label">Orders</div><div className="db-value">132</div><div className="db-delta">↑ 22.4% vs yesterday</div></div>
              <div className="db-stat-card"><div className="db-label">Appointments</div><div className="db-value">18</div><div className="db-delta">↑ 12.1% vs yesterday</div></div>
            </div>
            {/* Stat row 2 */}
            <div className="db-stat-row">
              <div className="db-stat-card"><div className="db-label">Revenue</div><div className="db-value">₦1,245,800</div><div className="db-delta">↑ 10.8%</div></div>
              <div className="db-stat-card"><div className="db-label">Avg. Wait Time</div><div className="db-value">18 min</div><div className="db-delta negative">↓ 0.5%</div></div>
              <div className="db-stat-card"><div className="db-label">Completed</div><div className="db-value">120</div><div className="db-delta">↑ 15.3%</div></div>
              <div className="db-stat-card"><div className="db-label">Customer Satisfaction</div><div className="db-value">4.8/5</div><div className="db-delta">↑ 0.6%</div></div>
            </div>
            {/* Bottom row */}
            <div className="db-bottom-row">
              {/* Live Queue */}
              <div className="db-panel-card">
                <div className="db-panel-head">Live Queue <a href="#">View all</a></div>
                <div className="db-queue-row"><span>#23</span><span>2 mins</span><span>2 people</span></div>
                <div className="db-queue-row"><span>#24</span><span>5 mins</span><span>4 people</span></div>
                <div className="db-queue-row"><span>#25</span><span>7 mins</span><span>2 people</span></div>
                <div className="db-queue-row"><span>#26</span><span>10 mins</span><span>3 people</span></div>
                <div className="db-queue-row"><span>#27</span><span>12 mins</span><span>2 people</span></div>
                <button className="db-queue-btn" type="button">Get in queue</button>
              </div>
              {/* Service Overview */}
              <div className="db-panel-card">
                <div className="db-panel-head">Service Overview (Last 30 mins) <a href="#">View report</a></div>
                <div className="db-service-overview">
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#3BB741" strokeWidth="12" strokeLinecap="round" strokeDasharray="70 213" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" strokeDasharray="40 243" transform="rotate(18 50 50)" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" strokeDasharray="20 253" transform="rotate(90 50 50)" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" strokeDasharray="10 263" transform="rotate(150 50 50)" />
                  </svg>
                  <div className="db-service-legend">
                    <div className="db-legend-item"><span><span className="db-legend-dot green" />Completed</span><strong>18</strong></div>
                    <div className="db-legend-item"><span><span className="db-legend-dot amber" />Pending</span><strong>9</strong></div>
                    <div className="db-legend-item"><span><span className="db-legend-dot blue" />In Review</span><strong>3</strong></div>
                    <div className="db-legend-item"><span><span className="db-legend-dot red" />Escalated</span><strong>2</strong></div>
                  </div>
                </div>
              </div>
              {/* Top Services */}
              <div className="db-panel-card">
                <div className="db-panel-head">Top Services / Items</div>
                <div className="db-service-row"><span style={{ fontSize: 10, color: "var(--muted, #888)" }}>1</span><span>Account Opening</span><span>142</span></div>
                <div className="db-service-row"><span style={{ fontSize: 10, color: "var(--muted, #888)" }}>2</span><span>Loan Enquiries</span><span>98</span></div>
                <div className="db-service-row"><span style={{ fontSize: 10, color: "var(--muted, #888)" }}>3</span><span>Card Requests</span><span>76</span></div>
                <div className="db-service-row"><span style={{ fontSize: 10, color: "var(--muted, #888)" }}>4</span><span>Deposit</span><span>68</span></div>
                <div className="db-service-row"><span style={{ fontSize: 10, color: "var(--muted, #888)" }}>5</span><span>Bill Payments</span><span>54</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
