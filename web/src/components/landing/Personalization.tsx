import { motion } from "framer-motion";

export default function CustomerForm() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Character Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1 flex justify-center"
          >
            <img
              src="https://i.ibb.co/mVqM5jQT/man-with-mobile-cell-phone-hand-character-looking-smartphone-reading-internet-message-surfing-online.png"
              alt="Customer looking at mobile phone"
              className="max-w-[420px] w-full h-auto object-contain"
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              One tap. Know what your customers need before they reach the desk.
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Build custom check-in forms for any workflow, whether it's a bank queue, a hospital line, or an order at your club. Customers complete it on their phone; your staff receive everything they need in real time.
            </p>
            <ul className="space-y-3">
              {[
                "Queue check-in with service-type routing",
                "Table number capture + product menu ordering",
                "Custom fields for any business type",
                "Staff dashboard updated instantly on submission",
                "Works without an app — no download required",
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

        </div>
      </div>
    </section>
  );
}
