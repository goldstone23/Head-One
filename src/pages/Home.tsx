import { useEffect } from "react";
import Lenis from "lenis";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Skills } from "../components/Skills";
import { Work } from "../components/Work";
import { Pricing } from "../components/Pricing";
import { Footer } from "../components/Footer";

export function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 500);
    }

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <Services />
        <Skills />
        <Work />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
