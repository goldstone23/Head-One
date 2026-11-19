import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "./layout";
import { services } from "../data/pricing";

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <Section id="services" className="border-t border-glass-border bg-transparent overflow-hidden relative">
      <div className="absolute inset-0 neon-grid opacity-20 pointer-events-none" />
      <div ref={containerRef} className="max-w-[100rem] mx-auto w-full relative z-10 pt-24 pb-16">
        <div className="flex flex-col items-center text-center mb-24 px-6 relative z-10">
            <motion.div style={{ y: titleY }} className="relative">
              <span className="text-xs font-sans tracking-widest text-accent uppercase mb-4 block">Core Offerings</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1] tracking-tighter mix-blend-difference text-foreground">
                Solutions that <br />
                <span className="italic text-muted-foreground">Scale.</span>
              </h2>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 relative z-10">
          {services.map((svc, idx) => (
            <motion.div 
              key={svc.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-500 flex flex-col"
            >
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none" />
              <div className="text-sm font-sans tracking-widest uppercase text-muted-foreground mb-4 border border-glass-border px-3 py-1 rounded-full w-fit group-hover:text-foreground transition-colors duration-300">
                0{idx + 1}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                {svc.name}
              </h3>
              <p className="text-muted-foreground font-sans font-light text-base leading-relaxed flex-1">
                {svc.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                 {svc.plans[0].features.slice(0, 2).map(f => (
                    <span key={f} className="text-xs font-sans tracking-wide px-3 py-1 bg-white/5 rounded-full border border-white/5 whitespace-nowrap">
                        {f}
                    </span>
                 ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
