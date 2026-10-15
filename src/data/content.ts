// TODO: contact info below is real. Bio can be tightened further as you like.

export const profile = {
  name: "Mustapha Sulaimon",
  role: "Full-Stack Developer & UI/UX Designer",
  tagline: "I build the whole thing: interface, logic, and the ship.",
  bio: "Five years building software end to end: web apps, mobile apps, and the interfaces that make people want to use them. I move across the stack by choice. I design a screen, wire the backend behind it, and ship it, without handing the thinking off along the way.",
  email: "musbaftech@gmail.com",
  whatsapp: "+2347025204373",
  whatsappDisplay: "+234 702 520 4373",
  linkedin: "https://ng.linkedin.com/in/mustapha-sulaimon-04b06022b",
  location: "Nigeria",
  yearsExperience: 5,
};

export const skills = [
  "React", "TypeScript", "Next.js", "React Native", "Flutter",
  "Node.js", "Express", "Python", "PostgreSQL", "Supabase",
  "Figma", "Tailwind CSS", "REST APIs", "MongoDB", "Docker",
];

export const process = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand the actual problem before touching a tool. Who it's for, what breaks without it, what success looks like.",
  },
  {
    step: "02",
    title: "Design",
    description: "Wireframe to high-fidelity UI, built to be built. No screen designed without knowing how it's wired up underneath.",
  },
  {
    step: "03",
    title: "Build",
    description: "Full-stack implementation, iterative and visible. You see working software early, not a reveal at the end.",
  },
  {
    step: "04",
    title: "Ship",
    description: "Deployed, tested, handed over clean. Documentation and structure a future developer can actually read.",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  problem: string;
  decisions: string[];
  stack: string[];
  link?: string;
  year: string;
  status: "live" | "concept";
};

export const projects: Project[] = [
  {
    id: "klasslab",
    title: "KlassLab",
    category: "EdTech / LMS",
    problem:
      "SIWES developer training cohorts ran on scattered tools: assignments in one place, code review in another, no way to track who was actually progressing.",
    decisions: [
      "Browser-based IDE built directly into the LMS, so students write and run code without leaving the platform.",
      "Cohort system that promotes students to tutors as they progress. The platform models growth, not just enrollment.",
      "Supabase handles auth, database, and real-time sync across attendance, messaging, and submissions.",
    ],
    stack: ["React", "Node.js", "Supabase"],
    link: "https://klasslab.vercel.app",
    year: "2025",
    status: "live",
  },
  {
    id: "surgenet",
    title: "SurgeNet",
    category: "ISP / Billing Portal",
    problem:
      "Running a paid WiFi hotspot means juggling contracts, manual account setup, and cash handling, when most customers just want to pay once and connect instantly.",
    decisions: [
      "Self-serve plan selection across time passes, data bundles, and unlimited access, with sign-in by phone or email so a customer's plan carries over.",
      "Paystack handles the payment flow end to end, with encrypted checkout and order confirmation before access is granted.",
      "Separate staff/admin panel for granting free access, batch-generating vouchers, and tracking customers and transactions, kept apart from the customer-facing flow.",
    ],
    stack: ["Next.js", "Node.js", "Paystack"],
    link: "https://surgenet.vercel.app",
    year: "2026",
    status: "live",
  },
  {
    id: "gready",
    title: "GREady",
    category: "EdTech / Test Prep PWA",
    problem:
      "GRE practice tools rarely match the real test's interface or adaptive scoring, so students walk in on test day without an accurate sense of their actual score.",
    decisions: [
      "Full-length adaptive practice tests that mirror the real GRE interface: the timer, question navigator, and on-screen calculator, not a generic quiz UI.",
      "Section-adaptive difficulty: a strong first section raises the difficulty of the next, the same way the real test adjusts.",
      "Installable as a PWA with in-progress tests saved on-device, so a test can be picked up offline without losing progress.",
    ],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Zustand"],
    link: "https://greadyprep.vercel.app",
    year: "2026",
    status: "live",
  },
  {
    id: "ledger",
    title: "Ledger",
    category: "FinTech / SaaS",
    problem:
      "Freelancers doing milestone work get stiffed or ghosted mid-project, with no neutral record of what was agreed or paid.",
    decisions: [
      "Milestone-based escrow: funds are held per milestone and released on approval, not as one lump invoice.",
      "Built the dispute flow first, not last, since it's the feature that actually earns trust from both sides.",
      "Multi-currency by default, since the freelancers this is for are rarely being paid in their own currency.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe Connect"],
    year: "2026",
    status: "concept",
  },
  {
    id: "marketplace",
    title: "Marketplace",
    category: "Commerce / WhatsApp",
    problem:
      "Most small sellers run their entire shop out of WhatsApp DMs, no inventory tracking, no order history, constant double-selling and 'is this still available?' chaos.",
    decisions: [
      "Sits on top of WhatsApp instead of competing with it: a shareable catalog link a seller drops into their status or bio, not a storefront customers have to be convinced to visit.",
      "Ordering opens a pre-filled WhatsApp message to the seller, so the buying flow customers already trust doesn't change.",
      "Stock decrements on confirmed orders in the dashboard, scoped deliberately: WhatsApp Cloud API auto-replies for stock checks are the documented phase two, not a corner cut for phase one.",
    ],
    stack: ["React", "Node.js", "Supabase", "WhatsApp Cloud API"],
    year: "2026",
    status: "concept",
  },
  {
    id: "handy",
    title: "Handy",
    category: "Local Services / Trust",
    problem:
      "Finding a plumber or electrician you can actually trust means asking around every time, no history, no accountability, price renegotiated at the door.",
    decisions: [
      "Verification and review history are the product, not a listing count: a tradesperson's profile is their completed-job record, not a self-written bio.",
      "Repeat-booking is the retention mechanic, so a good first job turns into a saved contact instead of another one-off search.",
      "Price ranges are set before contact, not haggled after arrival, to remove the most common point of friction.",
    ],
    stack: ["React Native", "Node.js", "PostgreSQL", "Supabase"],
    year: "2026",
    status: "concept",
  },
];

export const services = [
  { title: "Full-Stack Development", description: "End-to-end web applications, from database to deployed UI." },
  { title: "Mobile App Development", description: "Native-feel apps with React Native and Flutter, one codebase, real platforms." },
  { title: "UI/UX Design", description: "Interfaces designed to be built, and built by the person who designed them." },
];
