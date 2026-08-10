import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BentoGrid from "./BentoGrid";
import { BlobTopRight, BlobBottomLeft } from "./FlowingLines";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <BlobTopRight opacity={0.22} />
        <BlobBottomLeft opacity={0.15} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-6"
          >

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Better customer service<br /><span className="text-primary">Relayed</span> from a tap{" "}
            <span className="text-primary italic">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            From queue management to tableside ordering, streamline customer flow with a simple NFC tap. No app required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14"
              onClick={() => setLocation("/signin")}
              data-testid="button-hero-demo"
            >
              Get Started Free
            </Button>
            <span className="text-sm text-muted-foreground"> Compatible with all smartphones.</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <BentoGrid />
        </motion.div>
      </div>
    </section>
  );
}
