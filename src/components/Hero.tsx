import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { handleSmoothScroll } from "../lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden px-6 pt-32 pb-12">
      {/* Background neon grid */}
      <div className="absolute inset-0 neon-grid opacity-50 z-0 pointer-events-none" />
      <div className="absolute top-0 right-[-10vw] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      <motion.div 
        style={{ y, opacity, rotateX, scale }}
        className="max-w-[100rem] mx-auto w-full flex flex-col items-start z-10 relative perspective-[1000px] gap-8"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
           className="w-full grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Main Hero Bento Block */}
          <div className="md:col-span-8 glass-panel rounded-3xl p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-8 flex gap-3 items-center">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
              <span className="text-xs font-sans tracking-widest uppercase text-muted-foreground font-medium">Paradigm Shift</span>
            </div>

            <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-display font-medium tracking-tighter mb-8 text-foreground mix-blend-difference">
              We Build <br />
              <span className="italic text-muted-foreground/80">Digital Futures.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-sans font-light leading-relaxed">
              HeadOne is an award-winning elite full-stack agency specializing in hyper-growth architecture, 
              AI systems, and immersive web experiences.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col justify-end group overflow-hidden relative">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500" />
              <h3 className="text-3xl font-display mb-4 relative z-10">Start <br/>a Project</h3>
              <a
                href="#pricing"
                onClick={(e) => handleSmoothScroll(e, "#pricing")}
                className="w-full flex items-center justify-between border-t border-glass-border pt-4 text-foreground hover:text-accent transition-colors relative z-10"
              >
                <span className="text-sm font-sans tracking-widest uppercase">View Solutions</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:-rotate-45 transition-transform" />
              </a>
            </div>

            <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col justify-end group overflow-hidden relative border-t-accent hover:border-accent transition-colors">
               <h3 className="text-3xl font-display mb-4 relative z-10">Explore <br/>Awards</h3>
               <a
                href="#work"
                onClick={(e) => handleSmoothScroll(e, "#work")}
                className="w-full flex items-center justify-between border-t border-glass-border pt-4 text-foreground hover:text-accent transition-colors relative z-10"
              >
                <span className="text-sm font-sans tracking-widest uppercase">Our Work</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
