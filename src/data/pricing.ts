export type TierType = "Plus" | "Pro" | "Business";
export type PricingType = "payment" | "subscription";

export interface Plan {
  name: TierType;
  price: number;
  features: string[];
}

export interface ServicePricing {
  id: string;
  name: string;
  type: PricingType;
  description: string;
  plans: Plan[];
}

export const services: ServicePricing[] = [
  {
    id: "web-dev",
    name: "Web Development",
    type: "payment",
    description: "High-end website and platform development.",
    plans: [
      { name: "Plus", price: 1200, features: ["Single Page App", "Basic Animations", "Standard Support"] },
      { name: "Pro", price: 3500, features: ["Multi-page App", "CMS Integration", "GSAP Animations", "Priority Support"] },
      { name: "Business", price: 8500, features: ["Full-Stack App", "Custom Database", "Stripe Integration", "24/7 Dedicated Support"] }
    ]
  },
  {
    id: "performance-marketing",
    name: "Performance Marketing",
    type: "subscription",
    description: "Data-driven marketing and ROI optimization.",
    plans: [
      { name: "Plus", price: 1500, features: ["Audience Research", "Basic Ad Campaigns", "Monthly Reporting"] },
      { name: "Pro", price: 3000, features: ["Advanced Retargeting", "A/B Testing", "Weekly Strategy Calls"] },
      { name: "Business", price: 5500, features: ["Omnichannel Campaigns", "Custom Analytics Dashboard", "Daily Optimization"] }
    ]
  },
  {
    id: "ai-video",
    name: "AI-Video Generation",
    type: "subscription",
    description: "Automated video content creation with AI.",
    plans: [
      { name: "Plus", price: 500, features: ["5 Short-Form Videos", "Basic Scripts", "AI Voiceovers"] },
      { name: "Pro", price: 1500, features: ["15 Videos/month", "Custom Avatars", "Advanced Editing"] },
      { name: "Business", price: 3000, features: ["Unlimited Videos", "Dedicated Producer", "Multi-lingual Generation"] }
    ]
  },
  {
    id: "seo-geo",
    name: "SEO & Geo Optimization",
    type: "subscription",
    description: "Dominating local and global search rankings.",
    plans: [
      { name: "Plus", price: 700, features: ["On-Page SEO", "Local Listing Claims", "Quarterly Audit"] },
      { name: "Pro", price: 1500, features: ["Technical SEO", "Content Strategy", "Monthly Backlinks"] },
      { name: "Business", price: 3500, features: ["Enterprise SEO", "International Geo Targeting", "Competitor Analytics"] }
    ]
  },
  {
    id: "graphic-design",
    name: "Graphic Designing",
    type: "subscription",
    description: "Premium visual assets and branding.",
    plans: [
      { name: "Plus", price: 800, features: ["Social Media Assets", "Basic Branding", "2 Revisions"] },
      { name: "Pro", price: 2000, features: ["Full UI/UX Design", "Motion Graphics", "Unlimited Revisions"] },
      { name: "Business", price: 4500, features: ["Dedicated Art Director", "Comprehensive Brand Book", "3D Modeling"] }
    ]
  },
  {
    id: "social-media",
    name: "Social Media Handling",
    type: "subscription",
    description: "Growing and engaging your online community.",
    plans: [
      { name: "Plus", price: 900, features: ["2 Platforms", "3 Posts/Week", "Comment Moderation"] },
      { name: "Pro", price: 2500, features: ["4 Platforms", "Daily Posting", "Influencer Outreach"] },
      { name: "Business", price: 5000, features: ["All Platforms", "Custom Content Shoots", "24/7 Community Management"] }
    ]
  },
  {
    id: "amazon-branding",
    name: "Amazon Product Branding",
    type: "subscription",
    description: "Optimizing listings and storefronts.",
    plans: [
      { name: "Plus", price: 1000, features: ["SEO Listings", "Basic A+ Content", "Competitor Research"] },
      { name: "Pro", price: 3000, features: ["Premium A+ Content", "PPC Management", "Storefront Design"] },
      { name: "Business", price: 7000, features: ["Full Account Management", "Video Ads", "Global Expansion"] }
    ]
  },
  {
    id: "automation-systems",
    name: "Automation Systems",
    type: "payment",
    description: "Streamlining business operations through AI.",
    plans: [
      { name: "Plus", price: 2000, features: ["Basic Zapier Workflows", "Email Automation", "CRM Setup"] },
      { name: "Pro", price: 5000, features: ["Custom API Integrations", "AI Sales Bots", "Workflow Audits"] },
      { name: "Business", price: 12000, features: ["Enterprise Infrastructure", "Custom Automation Scripts", "On-Premises AI Server Setup"] }
    ]
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    type: "payment",
    description: "High-performance iOS and Android applications.",
    plans: [
      { name: "Plus", price: 6000, features: ["Hybrid App", "Standard UI", "Basic Features"] },
      { name: "Pro", price: 18000, features: ["Native Quality (React Native)", "Custom Animations", "API Integrations"] },
      { name: "Business", price: 45000, features: ["Fully Native App", "Complex Architecture", "AR/VR Integration", "Post-Launch Support"] }
    ]
  }
];
