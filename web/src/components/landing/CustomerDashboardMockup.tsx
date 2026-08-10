import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const queue = [
  { ticket: "A-001", name: "James Okafor", service: "Account Opening", wait: "2 min", status: "Serving", statusColor: "bg-green-100 text-green-800 border-green-200" },
  { ticket: "A-002", name: "Priya Nair", service: "Loan Enquiry", wait: "8 min", status: "Waiting", statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { ticket: "A-003", name: "Marcus Webb", service: "Card Replacement", wait: "14 min", status: "Waiting", statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { ticket: "A-004", name: "Sarah Chen", service: "Account Closure", wait: "21 min", status: "Waiting", statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { ticket: "A-005", name: "Omar Farooq", service: "General Enquiry", wait: "27 min", status: "Notified", statusColor: "bg-blue-100 text-blue-800 border-blue-200" },
  { ticket: "A-006", name: "Linda Asante", service: "Account Opening", wait: "34 min", status: "Waiting", statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
];

export default function CustomerDashboardMockup() {
  return (
    <Card className="overflow-hidden border border-border shadow-xl bg-card rounded-2xl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">Live Queue</h3>
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">Branch A · Main Floor</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">6</div>
            <div className="text-xs text-muted-foreground">Waiting</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-xl font-bold text-primary">A-001</div>
            <div className="text-xs text-muted-foreground">Now serving</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">~12 min</div>
            <div className="text-xs text-muted-foreground">Avg wait</div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Ticket</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Est. Wait</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {queue.map((row, i) => (
              <tr key={i} className={`hover:bg-muted/30 transition-colors ${i === 0 ? "bg-primary/5" : ""}`}>
                <td className="px-6 py-4 font-mono font-bold text-foreground">{row.ticket}</td>
                <td className="px-6 py-4 font-medium text-foreground">{row.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{row.service}</td>
                <td className="px-6 py-4 text-muted-foreground">{row.wait}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
