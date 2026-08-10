import { SolutionTemplate } from "../solution-template";

export default function HealthcarePage() {
  return (
    <SolutionTemplate
      industry="Healthcare"
      tagline="Reduce waiting room overcrowding. Improve patient experience."
      description="Relay brings calm and clarity to busy clinics, hospitals, and pharmacies. Patients check in digitally, wait safely, and get notified when they're needed — without sitting in a crowded room."
      heroStat="55%"
      heroStatLabel="reduction in waiting room occupancy reported by clinics using Relay's virtual queue"
      accentColor="primary"
      challenges={[
        {
          title: "Overcrowded waiting rooms",
          body: "Packed waiting areas are stressful for patients, increase infection risk, and give a poor first impression of care quality.",
        },
        {
          title: "Paper-based intake",
          body: "Clipboards and paper forms are slow, illegible, and hard to triage. Staff spend time decoding forms instead of serving patients.",
        },
        {
          title: "No communication during waits",
          body: "Patients have no visibility into how long they'll wait, leading to anxiety, complaints, and early departures.",
        },
      ]}
      features={[
        { icon: "📲", title: "Virtual Queue & Check-in", body: "Patients tap or scan to check in and wait anywhere — their car, a café, or home — and return when called." },
        { icon: "📋", title: "Digital Intake Forms", body: "Capture symptoms, medical history, insurance info, and consent digitally before the patient reaches the desk." },
        { icon: "🔔", title: "Patient Notification Alerts", body: "Automated SMS or WhatsApp messages update patients on their queue position and estimated wait time." },
        { icon: "🏥", title: "Department Routing", body: "Route patients to the correct department, consultant, or service queue automatically based on their intake form." },
        { icon: "🗂️", title: "Staff Triage Dashboard", body: "Nurses and reception staff see all check-ins, patient details, and queue status in one live view." },
        { icon: "📊", title: "Clinic Analytics", body: "Track peak visit times, average wait duration, and department load to improve staffing decisions." },
      ]}
      quote="Our waiting room went from standing room only to almost empty. Patients love being able to wait in their car and get a message when the doctor is ready."
      quoteAuthor="Head of Operations"
      quoteCompany="MedCity Clinics"
    />
  );
}
