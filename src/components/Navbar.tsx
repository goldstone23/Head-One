import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn, handleSmoothScroll } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3 bg-black/20 backdrop-blur-2xl border-b border-glass-border shadow-2xl" : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-[100rem] mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => handleSmoothScroll(e, "#")} className="group flex items-center gap-3">
          <div className="px-5 py-2 glass-panel flex items-center justify-center font-display font-medium text-lg tracking-wider group-hover:bg-accent group-hover:text-black transition-all duration-500 rounded-full group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            HeadOne
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 glass-panel rounded-full px-2 py-1">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://www.linkedin.com/in/paras-saini-hustler/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 glass-panel rounded-full text-foreground font-sans font-medium text-xs uppercase tracking-widest hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
              Contact
            </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-border mt-4 bg-background absolute top-full left-0 w-full"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className="text-2xl font-display font-medium text-foreground py-2 border-b border-border/50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/paras-saini-hustler/"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center mt-6 px-6 py-4 bg-foreground text-background font-sans font-medium text-sm uppercase tracking-widest"
              >
                Let's Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
