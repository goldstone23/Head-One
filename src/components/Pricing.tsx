import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "./layout";
import { services, type ServicePricing, type Plan } from "../data/pricing";
import { CheckoutDrawer } from "./CheckoutDrawer";

export function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServicePricing | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const handleSelectPlan = (service: ServicePricing, plan: Plan) => {
    setSelectedService(service);
    setSelectedPlan(plan);
  };

  return (
    <Section id="pricing" className="border-t border-glass-border bg-transparent overflow-hidden relative">
      <div className="absolute inset-0 neon-grid opacity-30 pointer-events-none" />
      <div ref={containerRef} className="max-w-[100rem] mx-auto w-full relative z-10 pt-24 pb-32 px-6">
        <motion.div style={{ y: titleY }} className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-sans tracking-widest text-accent uppercase mb-4 block">Invest in Excellence</span>
            <h2 className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter">
              Elite Tier <br />
              <span className="italic text-muted-foreground">Solutions.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-xl md:text-2xl font-sans font-light max-w-lg leading-relaxed mix-blend-difference">
            Transparent pricing models for world-class digital experiences, built for visionaries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-accent/40 transition-colors duration-500"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none" />
              
              <div className="mb-8 relative z-10">
                <span className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-3 border border-glass-border px-3 py-1 rounded-full w-fit">
                  {service.type === "subscription" ? "Monthly Retainer" : "Fixed Scope"}
                </span>
                <h3 className="text-2xl font-display font-medium text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>

              <div className="flex-1 flex flex-col gap-4 relative z-10">
                {service.plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => handleSelectPlan(service, plan)}
                    className="w-full text-left p-5 rounded-2xl border border-glass-border bg-black/20 hover:bg-black/40 hover:border-accent/50 transition-all duration-300 group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex justify-between items-center mb-1 relative z-10">
                      <span className="font-medium text-foreground">{plan.name}</span>
                      <span className="font-display text-xl text-accent group-hover/btn:scale-110 transition-transform">${plan.price.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground relative z-10">
                      {plan.features[Math.min(0, plan.features.length - 1)]} + more
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CheckoutDrawer 
        isOpen={selectedService !== null}
        onClose={() => { setSelectedService(null); setSelectedPlan(null); }}
        service={selectedService}
        plan={selectedPlan}
      />
    </Section>
  );
}
