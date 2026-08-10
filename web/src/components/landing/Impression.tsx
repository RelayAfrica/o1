import { motion } from "framer-motion";

export default function Impression() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Campaign Graphic Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1 flex justify-center"
          >
            <img
              src="https://i.ibb.co/SbSr1ds/bonus-program-discounts-gifts-advertising-campaign-offer-buyers-merchandise-promotion-promoter-with.jpg"
              alt="Promotion and bonus campaign illustration"
              className="max-w-[480px] lg:max-w-[540px] w-full h-auto object-contain rounded-2xl shadow-lg border border-border"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Keep your customers informed and coming back</h2>
            <p className="text-lg text-muted-foreground mb-6">
              You don't need to lose contact after customers leave the building. Relay delivers your ad campaigns via push notifications directly to customers' devices. No app or contact lists required.
            </p>
            <ul className="space-y-3">
              {[
                "Re-engage customers after every visit",
                "Deliver targeted offers directly to customers' phones",
                "Broadcast promotions, announcements, and important updates",
                "Schedule campaigns with opt-out compliant messaging",
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

