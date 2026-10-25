// Site content. Facts are checked against the project repos and the CV (Oct 2026).
// Never list This Lagos or Arzuz (owner's decision). girlfriend-day only appears anonymised in the Lab.

export const profile = {
  name: "Mustapha Sulaimon",
  fullName: "Mustapha Olabode Sulaimon",
  oriki: "Akanbi",
  orikiMeaning: "one who is deliberately born",
  role: "Full-Stack Developer · AI/ML Engineer · Designer",
  tagline: "I design the screen, write the logic and ship the product.",
  bio: "Five years building software end to end: web apps, mobile apps, AI models and the interfaces people actually want to use. I design it, build it, deploy it and stay with it after launch.",
  email: "musbaftech@gmail.com",
  whatsapp: "+2347025204373",
  whatsappDisplay: "+234 702 520 4373",
  linkedin: "https://ng.linkedin.com/in/mustapha-sulaimon-04b06022b",
  github: "https://github.com/weblord30",
  cv: "/Mustapha-Sulaimon-CV.pdf",
  location: "Nigeria",
  timezone: "Africa/Lagos",
  availability: "Open to remote work",
};

export const bookCall = `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Mustapha, I saw your portfolio and I'd like to book a call about a project.")}`;

export type Kind = "web" | "mobile" | "ai" | "desktop" | "brand";
export const KINDS: { id: Kind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI / ML" },
  { id: "desktop", label: "Desktop & Tools" },
  { id: "brand", label: "Brand" },
];

export type Cover = "llm" | "translator" | "dropout" | "kdp";
export type Project = {
  id: string;
  title: string;
  category: string;
  kinds: Kind[];
  problem: string;
  decisions: string[];
  stack: string[];
  link?: string;
  note?: string;
  cover?: Cover;
  year: string;
  status: "live" | "concept";
};

export const projects: Project[] = [
  {
    id: "westhomes",
    title: "Westhomes",
    category: "Real Estate · Client Build",
    kinds: ["web"],
    problem: "A property agency ran its whole business through WhatsApp posts: listings buried in chats, enquiries missed whenever nobody was online, and a firm brief of no monthly fees.",
    decisions: [
      "Runs entirely on Cloudflare's free tier (Workers, D1, R2, Workers AI), so the client's only running cost is the yearly domain.",
      "Staff post listings from Telegram: paste a listing the way it's written on WhatsApp and AI turns rent, agency, legal and caution into a preview, with approval for agents who can't publish.",
      "Enquiries and live-chat handoffs land in the team's Telegram group instantly, and visitors get push alerts plus a job-site-style morning email of new matches.",
    ],
    stack: ["Astro", "Cloudflare Workers", "D1", "Workers AI", "Telegram Bot API"],
    link: "https://westhomeshub.com",
    year: "2026",
    status: "live",
  },
  {
    id: "konnectkwasu",
    title: "KonnectKWASU",
    category: "Campus Social · Founder",
    kinds: ["mobile", "web"],
    problem: "Campus life at Kwara State University runs across scattered WhatsApp groups and Instagram pages, with no way to know who is really a student, deals done in DMs, and departments without an official voice.",
    decisions: [
      "Sign-up by matric number with ID verification, so every account is a real student or alumnus, and unverified accounts can browse but not post.",
      "Chat is end-to-end encrypted from the start, across DMs, groups and the marketplace, with history restored on every device the student signs into.",
      "One Expo codebase shipped first as an installable PWA that looks native on each phone, so students install from the website with no app store fees.",
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase"],
    link: "https://konnectkwasu.musbaftech.workers.dev",
    year: "2026",
    status: "live",
  },
  {
    id: "gready",
    title: "GREady",
    category: "EdTech · Test Prep PWA",
    kinds: ["web", "ai"],
    problem: "GRE practice tools rarely match the real test's interface or adaptive scoring, so students walk in on test day without an accurate sense of their actual score.",
    decisions: [
      "Full-length adaptive practice tests that mirror the real GRE interface: the timer, question navigator and on-screen calculator, not a generic quiz UI.",
      "Section-adaptive difficulty: a strong first section raises the difficulty of the next, the same way the real test adjusts.",
      "AI essay reviews and an installable PWA with in-progress tests saved on-device, so a test can be picked up offline.",
    ],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Zustand"],
    link: "https://greadyprep.vercel.app",
    year: "2026",
    status: "live",
  },
  {
    id: "llm-platform",
    title: "Open LLM Serving Platform",
    category: "AI Infrastructure",
    kinds: ["ai"],
    problem: "Running open-source models like Mistral, Qwen and DeepSeek usually means paying for GPU servers. I wanted a full chat product on free and student-grade compute.",
    decisions: [
      "Flask API on Google Colab GPUs with /generate, /health, /switch and /models, so models can be swapped live without a redeploy.",
      "4-bit quantization (bitsandbytes) to fit a 70B-parameter model on a single A100.",
      "Cloudflare Tunnel and ngrok give the Colab runtime a stable public URL, with a Google Apps Script bridge and chat UI in front. Infrastructure cost: zero.",
    ],
    stack: ["Python", "Flask", "Transformers", "bitsandbytes", "Cloudflare Tunnel"],
    note: "Runs on demand · demo on request",
    cover: "llm",
    year: "2026",
    status: "live",
  },
  {
    id: "yoruba-mnmt",
    title: "Yoruba Banking Translator",
    category: "AI Research · Final Year",
    kinds: ["ai"],
    problem: "Digital banking in Nigeria speaks English. Millions of Yoruba speakers are left reading terms, alerts and instructions in a language that isn't theirs, and Yoruba is a low-resource language for AI.",
    decisions: [
      "A context-aware seq2seq neural machine translation model, fine-tuned on banking-domain English and Yoruba corpora.",
      "Corpus augmentation and human validation sheets to stretch a small dataset without losing meaning.",
      "Wrapped in a Streamlit app so bank staff and researchers can try translations without touching code.",
    ],
    stack: ["PyTorch", "Hugging Face Transformers", "Streamlit", "Google Colab"],
    note: "KWASU final-year research, 2026",
    cover: "translator",
    year: "2026",
    status: "live",
  },
  {
    id: "dropout",
    title: "Student Dropout Early Warning",
    category: "AI Research · Explainable ML",
    kinds: ["ai"],
    problem: "Universities usually find out a student is struggling after they've already dropped out. The goal: flag risk early and show advisers why, not just a score.",
    decisions: [
      "Compared logistic regression, random forest and XGBoost, tuned for recall so fewer at-risk students are missed.",
      "SHAP explanations rank the factors behind every prediction, so an adviser can act on the reason.",
      "Threshold sweeps to choose the trade-off between false alarms and missed students deliberately, not by default.",
    ],
    stack: ["Python", "scikit-learn", "XGBoost", "SHAP"],
    note: "Research prototype",
    cover: "dropout",
    year: "2026",
    status: "live",
  },
  {
    id: "kdp-mate",
    title: "KDP Mate",
    category: "Desktop App · Browser Extension",
    kinds: ["desktop"],
    problem: "Amazon KDP authors pick keywords and niches by guesswork. I publish books myself, so I built the research tool I wanted.",
    decisions: [
      "A Windows desktop app with a local SQLite database: no cloud, no accounts, the author's research stays on their machine.",
      "A companion browser extension saves findings straight from Amazon into the app, alongside an in-app scraper for live search results.",
      "Bestseller-rank analytics, sales and revenue estimates and a niche opportunity score, used across my own ~20 published titles.",
    ],
    stack: ["Electron", "React", "Fastify", "SQLite", "Browser Extension"],
    note: "Private tool",
    cover: "kdp",
    year: "2026",
    status: "live",
  },
  {
    id: "surgenet",
    title: "SurgeNet",
    category: "ISP · Billing Portal",
    kinds: ["web"],
    problem: "Running a paid WiFi hotspot means juggling contracts, manual account setup and cash handling, when most customers just want to pay once and connect instantly.",
    decisions: [
      "Self-serve plan selection across time passes, data bundles and unlimited access, with sign-in by phone or email so a customer's plan carries over.",
      "Paystack handles the payment flow end to end, with order confirmation before access is granted.",
      "A separate staff panel for free access, batch vouchers and transactions, kept apart from the customer flow.",
    ],
    stack: ["Next.js", "Node.js", "Paystack"],
    link: "https://surgenet.vercel.app",
    year: "2026",
    status: "live",
  },
  {
    id: "klasslab",
    title: "KlassLab",
    category: "EdTech · LMS",
    kinds: ["web"],
    problem: "SIWES developer training ran on scattered tools: assignments in one place, code review in another, no way to track who was actually progressing.",
    decisions: [
      "A browser-based IDE (Monaco) built into the LMS, so students write and run code without leaving the platform.",
      "Cohorts that promote students to tutors as they progress. The platform models growth, not just enrollment.",
      "Supabase handles auth, data and real-time sync across attendance, messaging and submissions, on a $0 hosting bill.",
    ],
    stack: ["Next.js", "Supabase", "Monaco Editor"],
    link: "https://klasslab.vercel.app",
    year: "2026",
    status: "live",
  },
  {
    id: "mdwriters",
    title: "MD Writers",
    category: "Agency · Brand",
    kinds: ["brand", "web"],
    problem: "My own ghostwriting and publishing agency: authors and founders with a book or a brand in their head and no time or craft to get it onto the page.",
    decisions: [
      "A service menu scoped to the real work: memoirs, ghostwriting, business books, editing, Amazon KDP launch prep and cover design.",
      "Pricing shown upfront in Naira with a downloadable price list, so nobody has to email just to check the budget.",
      "WhatsApp as the primary contact path, because that's where this client base actually replies.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://mdwriters.vercel.app",
    year: "2025",
    status: "live",
  },
];

export const now = [
  { label: "Building", title: "KonnectKWASU", detail: "Pitching it to the KWASU Students' Union for a campus-wide rollout." },
  { label: "Shipped", title: "Westhomes", detail: "Live for a property agency, with a Telegram listing bot and zero monthly fees." },
  { label: "Researching", title: "Yoruba machine translation", detail: "Low-resource NMT that makes digital banking readable in Yoruba." },
  { label: "Teaching", title: "Python to undergraduates", detail: "SIWES Python tutor: lessons, labs and one-on-one debugging." },
];

export type LabItem = { id: string; kicker: string; title: string; body: string; tags: string[]; visual: "heart" | "brand" };
export const lab: LabItem[] = [
  {
    id: "letter",
    kicker: "Private by design",
    title: "A 3D love letter",
    body: "A one-person website built as a gift: a beating crystal heart in Three.js, a particle finale, a vinyl player and a scroll story choreographed with GSAP and Lenis. It has exactly one intended reader, so the link stays private.",
    tags: ["Three.js", "GSAP", "Lenis", "Canvas"],
    visual: "heart",
  },
  {
    id: "identity",
    kicker: "Brand identity",
    title: "The Adire cursor",
    body: "My own mark. The i in Sulaimon is a text cursor dyed like Adire cloth, dotted with a coral iyùn bead. Indigo for the dye, starch for the cloth, and an oriki underneath: Akanbi, made on purpose. Every letter outlined in code from one build script.",
    tags: ["Identity", "Typography", "SVG", "Generative"],
    visual: "brand",
  },
];

export const experience = [
  { role: "Founder & Full-Stack Developer", org: "Independent", period: "2021 to now", detail: "Client builds, my own products and research, designed and shipped end to end." },
  { role: "Independent Publisher", org: "Amazon KDP", period: "2023 to now", detail: "About 20 books with nearly $2,000 in organic sales and no paid ads. Built KDP Mate to research them." },
  { role: "Python Tutor (SIWES)", org: "KWASU", period: "2026 to now", detail: "Lessons, lab sessions and one-on-one support for undergraduates." },
  { role: "Software Developer Intern (SIWES)", org: "Industrial placement", period: "2024 to 2025", detail: "Requirements to design to deployment on a shipped product." },
  { role: "B.Sc. Computer Science", org: "Kwara State University", period: "2022 to 2026", detail: "Final-year research on context-aware Yoruba machine translation for banking." },
];

export const skills = [
  { group: "Build", items: ["React", "Next.js", "TypeScript", "Astro", "Node.js", "Python", "Flask", "Expo / React Native"] },
  { group: "AI / ML", items: ["PyTorch", "Hugging Face", "Fine-tuning", "Quantization", "NLP", "scikit-learn", "SHAP"] },
  { group: "Data & Infra", items: ["PostgreSQL", "Supabase", "SQLite", "Cloudflare Workers", "Vercel", "Docker"] },
  { group: "Design", items: ["Figma", "UI/UX", "Design systems", "Brand identity", "Motion"] },
];

export const process = [
  { step: "01", title: "Discover", description: "Understand the real problem before touching a tool. Who it's for, what breaks without it, what success looks like." },
  { step: "02", title: "Design", description: "Wireframe to high-fidelity UI, built to be built. No screen designed without knowing how it's wired underneath." },
  { step: "03", title: "Build", description: "Full-stack, iterative and visible. You see working software early, not a reveal at the end." },
  { step: "04", title: "Ship", description: "Deployed, tested and handed over clean, with documentation a future developer can actually read." },
];
