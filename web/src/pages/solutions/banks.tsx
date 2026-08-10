import { SolutionTemplate } from "../solution-template";

export default function BanksPage() {
  return (
    <SolutionTemplate
      industry="Banks"
      tagline="Modernise your banking hall queue experience — with a tap."
      description="Relay transforms chaotic banking halls into calm, organised customer flows. Customers check in with NFC or QR, get real-time notifications, and staff see everything on a live dashboard."
      heroStat="62%"
      heroStatLabel="average reduction in perceived wait time reported by bank branches on Relay"
      accentColor="primary"
      challenges={[
        {
          title: "Long queue pile-ups",
          body: "Physical queues cause frustration, complaints, and customer churn. Without visibility, staff can't intervene before it escalates.",
        },
        {
          title: "No-shows & wasted slots",
          body: "Appointment-based banking suffers from high no-show rates, leaving tellers idle while others wait unnecessarily long.",
        },
        {
          title: "Paper-based intake",
          body: "Pen-and-paper forms at the entrance are slow, error-prone, and add unnecessary steps before a customer reaches the counter.",
        },
      ]}
      features={[
        { icon: "📲", title: "NFC & QR Check-in", body: "Customers tap an NFC stand or scan a QR to join the queue instantly — no app, no download, no friction." },
        { icon: "🔔", title: "Real-time SMS/WhatsApp Alerts", body: "Notify customers of their position and estimated wait time so they can wait comfortably anywhere in the branch." },
        { icon: "📋", title: "Digital Intake Forms", body: "Capture account type, service requested, and ID number before the customer reaches the counter." },
        { icon: "🖥️", title: "Live Teller Dashboard", body: "Each teller sees their queue, marks customers as served, and calls the next in one click." },
        { icon: "📊", title: "Branch Analytics", body: "Track wait times, teller efficiency, peak hours, and customer feedback across all locations." },
        { icon: "🏢", title: "Multi-branch Command", body: "Head office can monitor all branches and compare performance on a single screen." },
      ]}
      quote="We cut our average lobby wait time by half within the first month. Customers now wait outside or in their car and come in only when it's their turn."
      quoteAuthor="Operations Manager"
      quoteCompany="City National Bank"
    />
  );
}
