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
};

export const projects: Project[] = [
  {
    id: "ikonleague",
    title: "iKonLeague",
    category: "Sports Tech / Mobile App",
    problem:
      "Competitive eFootball communities had no structure: no real registration, scheduling, or leaderboards, just group chats trying to run a league.",
    decisions: [
      "Live registration counter shows how many players and teams have joined, so the room visibly fills up as it goes.",
      "Both players submit their result with proof after a scheduled match. Matching submissions update the standings automatically, mismatches route straight to an admin dispute queue.",
      "Supabase handles auth, real-time data, and proof storage. Flutter front end for one codebase across platforms.",
    ],
    stack: ["Flutter", "Node.js", "Supabase"],
    year: "2025",
  },
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
    year: "2025",
  },
  {
    id: "nexus",
    title: "Nexus",
    category: "SaaS / Business Intelligence",
    problem:
      "Growing businesses had the data (revenue, activity, team performance) but no single live view of it, and reporting meant manual exports every time.",
    decisions: [
      "Custom widget layouts so each team monitors what actually matters to them, not a fixed dashboard.",
      "Live-updating metrics over polling, for near real-time accuracy without hammering the backend.",
      "Next.js front end with a Python service layer for analytics processing, PostgreSQL underneath.",
    ],
    stack: ["Next.js", "Python", "PostgreSQL"],
    year: "2025",
  },
];

export const services = [
  { title: "Full-Stack Development", description: "End-to-end web applications, from database to deployed UI." },
  { title: "Mobile App Development", description: "Native-feel apps with React Native and Flutter, one codebase, real platforms." },
  { title: "UI/UX Design", description: "Interfaces designed to be built, and built by the person who designed them." },
];
