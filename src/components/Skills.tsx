import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "./layout";

const skills = [
  "Frontend Architecture",
  "System Design",
  "Interactive Web Experiences",
  "AI Automations",
  "Prompt Engineering",
  "Brand Identity",
  "Commercial Visuals",
  "Conversion Optimization",
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <Section id="skills" className="border-t border-glass-border bg-transparent overflow-hidden py-32 md:py-48 relative" >
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[20vh] bg-accent/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      
      <div ref={containerRef} className="max-w-[100vw] mx-auto w-full relative z-10">
        
        <div className="px-6 md:px-12 mb-20 max-w-[100rem] mx-auto flex flex-col items-center">
           <span className="text-xs font-sans tracking-widest text-accent uppercase block border border-glass-border px-4 py-1.5 rounded-full glass-panel">Core Arsenal</span>
        </div>

        <div className="flex flex-col gap-8 md:gap-16 w-[150vw] md:w-[120vw] relative left-1/2 -translate-x-1/2">
          {/* Row 1 */}
          <motion.div 
            style={{ x: x1 }}
            className="flex gap-8 items-center whitespace-nowrap"
          >
            {[...skills, ...skills].map((skill, idx) => (
              <div 
                key={`${skill}-${idx}-1`} 
                className="text-6xl sm:text-7xl md:text-9xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/0 md:hover:from-white md:hover:to-white/50 stroke-text transition-all duration-500 cursor-default px-8"
              >
                {skill}
                <span className="text-accent/50 mx-8 md:mx-16 font-sans font-light opacity-50">*</span>
              </div>
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div 
            style={{ x: x2 }}
            className="flex gap-8 items-center whitespace-nowrap"
          >
            {[...skills.reverse(), ...skills].map((skill, idx) => (
              <div 
                key={`${skill}-${idx}-2`} 
                className="text-6xl sm:text-7xl md:text-9xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/0 md:hover:from-white md:hover:to-white/50 stroke-text transition-all duration-500 cursor-default italic px-8"
              >
                {skill}
                <span className="text-accent/50 mx-8 md:mx-16 font-sans font-normal not-italic opacity-50">*</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
