import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import type { ServicePricing, Plan } from "../data/pricing";

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServicePricing | null;
  plan: Plan | null;
}

export function CheckoutDrawer({ isOpen, onClose, service, plan }: CheckoutDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRazorpayCheckout = async () => {
    if (!service || !plan) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service.name,
          tier: plan.name,
          price: plan.price,
          type: service.type,
        }),
      });
      const order = await response.json();

      if (order.error) {
        throw new Error(order.error);
      }

      if (order.isMock) {
        // If no Razorpay keys are configured, simulate success
        window.location.href = `/success?session_id=${order.id}`;
        return;
      }

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "HeadOne",
        description: `${service.name} - ${plan.name} Tier`,
        order_id: order.id,
        handler: function (response: any) {
          window.location.href = `/success?session_id=${response.razorpay_payment_id}`;
        },
        prefill: {
          email: "parassunduriya@gmail.com",
          contact: "7206055971"
        },
        theme: {
          color: "#eab308",
        },
      };

      if ((window as any).Razorpay) {
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      } else {
        throw new Error("Razorpay execution script failed to load.");
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && service && plan && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-background/90 backdrop-blur-2xl border-l border-glass-border z-50 shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-glass-border flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-display font-medium">Checkout Details</h2>
              <button onClick={onClose} className="p-2 hover:bg-glass rounded-full transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              <div className="glass-panel p-6 rounded-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -mx-10 -my-10" />
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">{service.name}</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-display font-medium text-accent">{plan.name}</span>
                </div>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-sans font-light">${plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground">{service.type === "subscription" ? "/month" : "one-time"}</span>
                </div>

                <ul className="space-y-4 relative z-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 text-red-500 text-sm">
                  {error}
                </div>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                By accelerating your digital transformation with us, you agree to our Terms of Service and Privacy Policy.
                Secure payment processing via Razorpay.
              </p>
            </div>

            <div className="p-8 border-t border-glass-border bg-black/40 flex flex-col gap-4">
              <button
                onClick={handleRazorpayCheckout}
                disabled={loading}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-black font-medium tracking-wide uppercase text-sm transition-colors rounded-none flex justify-center items-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay with Razorpay"}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
