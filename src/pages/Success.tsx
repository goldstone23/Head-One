import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Success() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex-1 flex items-center justify-center min-h-[80vh] px-6">
        <div className="glass-panel w-full max-w-lg rounded-3xl p-10 md:p-14 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">Payment Successful</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for choosing HeadOne. Our team will reach out to you shortly to begin the onboarding process.
          </p>
          <Link
            to="/"
            className="px-8 py-4 bg-accent text-black font-medium tracking-wide uppercase text-sm rounded-none hover:bg-accent-hover transition-colors inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
