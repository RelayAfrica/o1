import { SolutionTemplate } from "../solution-template";

export default function RetailPage() {
  return (
    <SolutionTemplate
      industry="Retail"
      tagline="Move more customers through your store — without the chaos."
      description="Relay helps retail businesses manage footfall, service queues at fitting rooms or counters, and customer re-engagement campaigns — all from one dashboard."
      heroStat="33%"
      heroStatLabel="increase in customer throughput at retail service counters using Relay"
      accentColor="primary"
      challenges={[
        {
          title: "Long checkout and service queues",
          body: "Customers abandon purchases when queues are long and unmanaged. Without visibility, staff can't open extra lanes fast enough.",
        },
        {
          title: "No repeat customer data",
          body: "Most retail businesses have no way to identify repeat visitors or re-engage them after a purchase.",
        },
        {
          title: "Manual stock-check requests",
          body: "Customers asking for size checks, stock availability, or fitting rooms create verbal bottlenecks on the floor.",
        },
      ]}
      features={[
        { icon: "🛍️", title: "Service Counter Queue", body: "Customers join a virtual queue at your service desk, fitting room, or returns counter via NFC or QR scan." },
        { icon: "📲", title: "Floor Staff Notifications", body: "Staff receive alerts when a customer needs assistance, a fitting room is ready, or a request is waiting." },
        { icon: "📣", title: "Post-visit Campaigns", body: "Send personalised WhatsApp or SMS promotions to customers after they've visited — based on what they enquired about." },
        { icon: "🏷️", title: "Product Enquiry Forms", body: "Customers submit size, colour, or stock enquiries digitally. Staff handle requests in priority order." },
        { icon: "🖥️", title: "Store Dashboard", body: "See live floor activity, pending service requests, and wait times at every station from one screen." },
        { icon: "📊", title: "Footfall Analytics", body: "Understand peak shopping hours, popular service types, and average service duration to plan staffing better." },
      ]}
      quote="The queue at our returns desk went from a constant complaint to a non-issue. Customers scan and browse while they wait — and most end up buying more."
      quoteAuthor="Store Manager"
      quoteCompany="Metro Retail Group"
    />
  );
}
