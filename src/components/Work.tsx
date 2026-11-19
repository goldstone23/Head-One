import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "./layout";
import { ArrowUpRight } from "lucide-react";

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const projects = [
    {
      title: "UI/UX & Web Design",
      description: "My curated collection of website designs, interfaces, and Figma prototypes showcasing premium aesthetics.",
      link: "https://www.figma.com/design/kQZrD7H8EsJFRzlzpB9v6Q/designs-group?m=auto&t=dwZGOYAzyMbFufoM-6",
      tag: "Figma",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Amazon & AI Visuals",
      description: "Proof of work demonstrating high-conversion Amazon product listings and AI-generated commercial visuals.",
      link: "https://drive.google.com/drive/folders/1NZDrm9vLjxT_PGI8uit9JxDQ1EF53OHi?usp=sharing",
      tag: "Google Drive",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Automation & Systems",
      description: "A showcase of automated workflows, prompt engineering systems, and AI content generation results.",
      link: "https://drive.google.com/drive/folders/1j_Vie4j_MjuCZpC-ku1uB5mSeckHGXKQ?usp=drive_link",
      tag: "Google Drive",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <Section id="work" className="border-t border-glass-border bg-transparent overflow-hidden relative">
      <div ref={containerRef} className="max-w-[100rem] mx-auto w-full relative z-10 pt-24 pb-16 px-6">
        <motion.div style={{ y: titleY }} className="mb-24 text-center flex flex-col items-center">
          <span className="text-xs font-sans tracking-widest text-accent uppercase mb-4 block">Selected Works</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] tracking-tighter mix-blend-difference">
            Proof of <br />
            <span className="italic text-muted-foreground">Excellence.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((item, idx) => (
            <motion.a 
              href={item.link} 
              target="_blank" 
              rel="noreferrer"
              key={item.title} 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel group relative flex flex-col rounded-3xl overflow-hidden hover:border-accent/30 transition-all duration-700"
            >
              <div className="relative w-full h-[400px] lg:h-[450px] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1] opacity-70 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-sans tracking-widest uppercase border border-white/20 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90">
                      {item.tag}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors duration-500">
                      <ArrowUpRight strokeWidth={1.5} className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-3 text-white">
                    {item.title}
                  </h4>
                  <p className="text-white/60 font-sans font-light text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
