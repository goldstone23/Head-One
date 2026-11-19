import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "./layout";
import { ArrowUpRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { handleSmoothScroll } from "../lib/utils";

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const footerY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("https://formsubmit.co/ajax/parassunduriya@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer ref={containerRef} className="relative bg-transparent text-foreground py-0 overflow-hidden z-20 border-t border-glass-border">
      <div className="absolute inset-0 neon-grid opacity-10 pointer-events-none" />
      <motion.div style={{ y: footerY }} className="pt-32 pb-12 w-full relative z-10">
        <Section id="contact" className="py-0 px-6 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left Column */}
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-sans tracking-widest text-accent uppercase mb-6 block border border-glass-border px-3 py-1.5 rounded-full">Ready to Ignite?</span>
              <h3 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-display font-medium mb-12 tracking-tighter mix-blend-difference">
                Let's <br />
                <span className="italic text-muted-foreground">Talk.</span>
              </h3>
              <p className="text-muted-foreground text-xl font-sans font-light max-w-md leading-relaxed mb-16">
                Whether you need a custom AI workflow, high-end web design, or a complex software solution, we are ready to scale your vision.
              </p>
              
              <div className="w-full h-px bg-glass-border mb-8" />
              
              <a
                href="https://www.linkedin.com/in/paras-saini-hustler/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col w-full py-4 relative overflow-hidden"
              >
                 <span className="text-3xl font-display font-medium relative z-10 flex items-center justify-between w-full text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                   LinkedIn
                   <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 group-hover:text-accent transition-transform duration-500" />
                 </span>
                 <div className="absolute bottom-0 left-0 w-full h-px bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              </a>
            </div>

            {/* Right Column: Form */}
            <div className="w-full glass-panel rounded-3xl p-8 md:p-14 text-foreground relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-24 relative z-10">
                  <div className="w-20 h-20 bg-accent text-black rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-4xl font-display font-medium mb-4">Transmission Sent.</h4>
                  <p className="text-lg font-sans font-light text-muted-foreground mb-12">I have received your inquiry. Expect a response within 24 hours.</p>
                  
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm tracking-widest uppercase font-sans border-b border-foreground hover:text-accent hover:border-accent transition-colors pb-1"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form action="https://formsubmit.co/parassunduriya@gmail.com" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="box" />
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Name</label>
                    <input required type="text" id="name" name="name" className="w-full px-0 py-3 border-b border-glass-border bg-transparent focus:border-accent outline-none transition-colors text-xl font-display font-light placeholder:text-muted-foreground/30 rounded-none text-foreground" placeholder="Jane Doe" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Email</label>
                    <input required type="email" id="email" name="email" className="w-full px-0 py-3 border-b border-glass-border bg-transparent focus:border-accent outline-none transition-colors text-xl font-display font-light placeholder:text-muted-foreground/30 rounded-none text-foreground" placeholder="jane@company.com" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Interest</label>
                    <select id="service" name="service" className="w-full px-0 py-3 border-b border-glass-border bg-transparent focus:border-accent outline-none transition-colors appearance-none text-xl font-display font-light rounded-none cursor-pointer text-foreground">
                      <option className="bg-black" value="AI Workflow">AI Workflow Optimization</option>
                      <option className="bg-black" value="Prompt Engineering">Prompt Engineering & Content</option>
                      <option className="bg-black" value="Web Development">Full-Stack Web Development</option>
                      <option className="bg-black" value="Performance Marketing">Performance Marketing</option>
                      <option className="bg-black" value="Other">Other Inquiry</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Details</label>
                    <textarea required id="message" name="message" rows={3} className="w-full px-0 py-3 border-b border-glass-border bg-transparent focus:border-accent outline-none transition-colors resize-none text-xl font-display font-light placeholder:text-muted-foreground/30 rounded-none text-foreground" placeholder="Tell me about your vision..."></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full mt-4 overflow-hidden border border-glass-border bg-white/5 hover:bg-white/10 text-foreground py-5 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                     <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                     <span className="relative z-10 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-medium group-hover:text-black transition-colors">
                       {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            Initiate Sequence
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                     </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-32 pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between text-xs tracking-widest uppercase text-muted-foreground font-sans">
            <p className="flex items-center gap-2">© {new Date().getFullYear()} HEADONE <span className="w-1 h-1 bg-accent rounded-full inline-block"></span> independent digital agency</p>
            <div className="flex gap-8 mt-6 md:mt-0">
               <span className="hover:text-foreground transition-colors cursor-pointer">HeadOne Elite</span>
            </div>
          </div>
        </Section>
      </motion.div>
    </footer>
  );
}
