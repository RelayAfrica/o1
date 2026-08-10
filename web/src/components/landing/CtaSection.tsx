import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function CtaSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute left-[-5%] top-[-15%] w-[500px] h-[500px] opacity-10 text-primary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.1C90.4,-33.1,96,-16.6,95.5,-0.3C95,16,88.4,32.1,78.5,45.4C68.6,58.7,55.3,69.2,40.7,75.4C26.1,81.6,10.2,83.5,-4.8,81.3C-19.8,79,-33.9,72.6,-46.3,63.9C-58.7,55.2,-69.3,44.2,-76.7,31.2C-84.1,18.2,-88.3,3.1,-87.3,-11.6C-86.3,-26.3,-80.1,-40.6,-70.7,-51.7C-61.3,-62.8,-48.7,-70.7,-35.3,-76.1C-21.9,-81.5,-7.7,-84.4,6.7,-83.4C21.1,-82.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute right-[-8%] bottom-[-10%] w-[550px] h-[550px] opacity-10 text-primary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M51.5,-67.2C65.5,-59.1,74.8,-43.3,81.4,-26.5C88,-9.7,91.9,8,86.6,23.1C81.3,38.2,66.8,50.7,51.2,60.8C35.6,70.9,18.9,78.6,1.4,76.8C-16.1,75,-32.2,63.7,-46.8,51.8C-61.4,39.9,-74.5,27.4,-80.2,11.5C-85.9,-4.4,-84.2,-23.7,-74.6,-38.7C-65,-53.7,-47.4,-64.4,-31.2,-71.4C-15,-78.4,3.7,-81.7,20.8,-77.9C37.9,-74.1,37.5,-75.3,51.5,-67.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-background mb-6 leading-tight">
              Replace the queues.<br />
              <span className="text-primary">Keep your customers happy.</span>
            </h2>
            <p className="text-lg text-background/70 mb-4 max-w-md">
              Handle your crowds and customer engagement with minimal infrastructural changes and provide your customers and staff a dramatically better experience.
            </p>
            <ul className="space-y-2 mb-10">
              {["No crowd clusters", "No paper tickets", "No dedicated app", "Keep in touch with customers, even after they leave"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-background/70 text-sm">
                  <span className="text-primary font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 h-14"
              onClick={() => setLocation("/signin")}
              data-testid="button-cta-demo"
            >
              Get Started Free
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center animate-fade-in"
          >
            <img
              src="https://i.ibb.co/CpTsHcpt/Gemini-Generated-Image-i12h5ni12h5ni12h.png"
              alt="Live activity illustration"
              className="max-w-[480px] lg:max-w-[540px] w-full h-auto object-contain rounded-2xl shadow-2xl border border-background/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

