import { motion } from "framer-motion";

export default function Proactive() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Real-time insight into every queue, at every branch</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Relay's live analytics dashboard shows wait times, queue depth, and service flow rates across all your locations. This allows for you to allocate staff, spot bottlenecks, and keep service levels high.
            </p>
            <ul className="space-y-3">
              {[
                "Live queue depth per service type",
                "Average wait time by hour and day",
                "Staff productivity",
                "Multi-branch visibility",
                "Detailed monthly reports",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="https://i.ibb.co/yFmzPhF5/Gemini-Generated-Image-8rs72w8rs72w8rs7-removebg-preview.png"
              alt="Analytics Dashboard Preview"
              className="max-w-[720px] lg:max-w-[840px] w-full h-auto object-contain lg:translate-x-4"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

