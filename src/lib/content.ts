// Copy sourced from David's Figma file (TAK Redesign, "Web pages" page) unless marked PLACEHOLDER.

export const problems = [
  {
    title: "Off-the-shelf mismatch",
    body: "Generic solutions force you to adapt your workflows to their limitations.",
  },
  {
    title: "Slow, unreliable systems",
    body: "Legacy code and poor architecture lead to downtime and lost revenue.",
  },
  {
    title: "No clear path to launch",
    body: "Without strategic guidance, projects stall and budgets inflate.",
  },
];

export const services = [
  {
    title: "Custom Software",
    body: "End-to-end systems built around your exact processes, not the other way round.",
  },
  {
    title: "Mobile Apps",
    body: "Native-feeling apps that empower communities and scale with your users.",
  },
  {
    title: "Web Development",
    body: "Responsive, performant websites and web apps built for real business goals.",
  },
  {
    title: "Cloud",
    body: "Architecture, deployment, and migration for reliability at scale.",
  },
  {
    title: "UI/UX Design",
    body: "From wireframes to polished designs, we make interactions leave a lasting impression.",
  },
  {
    title: "IT Consulting",
    body: "Strategy-to-execution guidance for teams modernizing their tech stack and operations.",
  },
];

export const processSteps = [
  { number: 1, title: "Discover", body: "We learn your business, users, and goals." },
  { number: 2, title: "Design", body: "Wireframes to polished UI, validated early." },
  { number: 3, title: "Build", body: "Clean, tested code shipped in short cycles." },
  { number: 4, title: "Launch", body: "We deploy, monitor, and hand over with confidence." },
  { number: 5, title: "Support", body: "Ongoing maintenance and iteration as you grow." },
];

export type PortfolioProject = {
  slug: string;
  name: string;
  category: "MOBILE APP" | "Desktop App" | "Web App";
  blurb: string;
  stack: string[];
  // Real screenshots live in the Figma file but could not be exported through
  // the DesignAgent bridge this session (asset export timed out). Every card
  // renders a neutral device mockup (see PortfolioThumbnail) until real
  // screenshots are wired in. Desn additionally needed a mockup on purpose:
  // gap G4, it shared Telxul's screenshot in the Figma file.
  overview: string;
  problem: string;
  solution: string;
  status: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "desn",
    name: "Desn",
    category: "MOBILE APP",
    blurb: "A shopping app that grew repeat orders for local vendors.",
    stack: ["Flutter", "Firebase"],
    overview:
      "Desn is a hyper-local commerce platform designed to bridge the gap between street vendors and digital-first customers in Mbarara.",
    problem:
      "Local vendors lacked a reliable way to manage inventory and reach customers beyond physical foot traffic, leading to missed sales and inefficient stock management.",
    solution:
      "TAK built a lightweight, offline-first mobile app that lets vendors track sales and stock in real time.",
    status: "Live",
  },
  {
    slug: "stec-sms",
    name: "STEC SMS",
    category: "Desktop App",
    blurb: "School management that cut admin time for staff.",
    stack: ["Python", "Django", "PostgreSQL", "Flutter"],
    // PLACEHOLDER: gap G8. Figma's Project Details overlay only has full
    // Overview/Problem/Solution copy for Desn. Written from the same known
    // facts as the portfolio blurb, capability only, no invented metrics.
    overview:
      "STEC SMS is a school management system built for administrative staff running day-to-day student and records operations.",
    problem:
      "Staff were managing student records and admin tasks through manual, paper-based processes that were slow and error-prone.",
    solution:
      "TAK built a desktop application with a Django and PostgreSQL backend and a Flutter client for day-to-day record keeping.",
    status: "Completed",
  },
  {
    slug: "telxul",
    name: "Telxul",
    category: "Web App",
    blurb: "Connecting different class cohorts from different schools in the country.",
    stack: ["JavaScript", "HTML", "Python", "Django", "React", "PostgreSQL"],
    // PLACEHOLDER: gap G8.
    overview:
      "Telxul is a web platform connecting class cohorts across different schools in the country.",
    problem:
      "Students and cohorts from different schools had no shared platform to connect and collaborate with each other.",
    solution:
      "TAK built a React and Django web app with a shared PostgreSQL backend so cohorts across schools can connect on one platform.",
    status: "Completed",
  },
  {
    slug: "projector23",
    name: "Projector23",
    category: "MOBILE APP",
    // PLACEHOLDER: gap G2. Figma marked this "Need Info". Real capability
    // description only, no invented client metrics.
    blurb: "A suite of four Flutter apps built for one client on a shared design system and backend.",
    // PLACEHOLDER: gap G3. Figma listed this project as four near-identical
    // Flutter cards. Collapsed to one card with the build count as a stack line.
    stack: ["Flutter x4"],
    // PLACEHOLDER: gap G8.
    overview:
      "Projector23 is a suite of four Flutter apps built for one client on a shared design system and backend.",
    problem:
      "The client needed four related apps to feel and behave consistently without building each one from scratch.",
    solution:
      "TAK built a shared Flutter design system and backend, then shipped all four apps on top of it.",
    status: "Completed",
  },
  {
    slug: "tak-poultry-farm",
    name: "TAK Poultry Farm",
    category: "MOBILE APP",
    // PLACEHOLDER: gap G2. Figma marked this "Need Info".
    blurb: "A mobile app for a poultry operation, built for real-time flock and stock record keeping.",
    stack: ["Flutter", "Firebase"],
    // PLACEHOLDER: gap G8.
    overview:
      "A mobile app for a poultry operation, built for real-time flock and stock record keeping.",
    problem:
      "The operation was tracking flock and stock records manually, with no shared, up-to-date view across staff.",
    solution:
      "TAK built a Flutter app backed by Firebase so records update in real time across the team.",
    status: "Completed",
  },
  {
    slug: "tasse-fm",
    name: "Tasse FM",
    category: "MOBILE APP",
    // PLACEHOLDER: gap G2. Figma marked this "Need Info".
    blurb: "A media app for a radio station, pairing a Flutter client with a Django and PostgreSQL backend.",
    stack: ["Flutter", "Firebase", "Python", "Django", "PostgreSQL"],
    // PLACEHOLDER: gap G8.
    overview:
      "A media app for a radio station, pairing a Flutter client with a Django and PostgreSQL backend.",
    problem:
      "The station had no dedicated app for listeners, limiting how it could reach and engage its audience.",
    solution:
      "TAK built a Flutter listener app on a Django and PostgreSQL backend, with Firebase for real-time features.",
    status: "Completed",
  },
];

export const whyTrustValues = [
  {
    title: "Innovation",
    body: "Pushing the boundaries of technology to deliver future-proof, scalable solutions.",
  },
  {
    title: "Integrity",
    body: "Transparent communication and honest pricing from kickoff to deployment.",
  },
  {
    title: "Impact",
    body: "Building digital tools that drive measurable growth and empower local communities.",
  },
  {
    title: "Collaboration",
    body: "Working closely with your team as a dedicated technical partner.",
  },
];

export type ServiceDetail = {
  title: string;
  description: string;
  problemItSolves: string;
  whoItsFor: string;
  tools: string[];
};

// Figma's Service Detail Overlay only has full content for "UI/UX Design".
// The other five are marked PLACEHOLDER: capability-level statements
// consistent with the real service description above, no invented clients
// or metrics. The "How We Work" steps are the same real, company-wide
// process for every service, so they are not repeated per service here.
export const serviceDetails: Record<string, ServiceDetail> = {
  "Custom Software": {
    title: "Custom Software",
    description:
      "End-to-end systems built around your exact processes, not the other way round.",
    // PLACEHOLDER: gap G7.
    problemItSolves:
      "Off-the-shelf software forces a business to change how it works to fit the tool, instead of the other way round.",
    // PLACEHOLDER: gap G7.
    whoItsFor:
      "Businesses whose workflow does not fit any existing product on the market.",
    tools: ["Python", "Django", "PostgreSQL"],
  },
  "Mobile Apps": {
    title: "Mobile Apps",
    description:
      "Native-feeling apps that empower communities and scale with your users.",
    // PLACEHOLDER: gap G7.
    problemItSolves:
      "Reaching users who live on their phones, not a desktop browser.",
    // PLACEHOLDER: gap G7.
    whoItsFor:
      "Businesses and communities that need a native-feeling app their users will actually keep on their phones.",
    tools: ["Flutter", "Firebase"],
  },
  "Web Development": {
    title: "Web Development",
    description:
      "Responsive, performant websites and web apps built for real business goals.",
    // PLACEHOLDER: gap G7.
    problemItSolves:
      "A slow or poorly built website costs credibility and customers before a conversation even starts.",
    // PLACEHOLDER: gap G7.
    whoItsFor:
      "Businesses that need a website or web app built to convert, not just to exist.",
    tools: ["React", "JavaScript", "Django"],
  },
  Cloud: {
    title: "Cloud",
    description:
      "Architecture, deployment, and migration for reliability at scale.",
    // PLACEHOLDER: gap G7.
    problemItSolves:
      "Systems that work for a handful of users but fall over under real load or real traffic.",
    // PLACEHOLDER: gap G7.
    whoItsFor:
      "Teams whose infrastructure needs to be reliable as they scale, not just functional on day one.",
    tools: ["PostgreSQL", "Firebase"],
  },
  "UI/UX Design": {
    title: "UI/UX Design",
    description:
      "We understand the pivotal role of design in user satisfaction. From wireframes to polished designs, we ensure every interaction leaves a lasting impression, enhancing user engagement and satisfaction.",
    problemItSolves:
      "Teams ship interfaces users don't understand, then pay for it in support tickets and abandoned sign-ups.",
    whoItsFor:
      "Businesses with an existing product that under-performs, and founders who need a credible first release.",
    tools: ["Figma", "Framer", "Stitch"],
  },
  "IT Consulting": {
    title: "IT Consulting",
    description:
      "Strategy-to-execution guidance for teams modernizing their tech stack and operations.",
    // PLACEHOLDER: gap G7.
    problemItSolves:
      "Teams know they need to modernize but lack the in-house expertise to plan the move safely.",
    // PLACEHOLDER: gap G7.
    whoItsFor:
      "Teams modernizing an existing tech stack or operation who want a technical partner, not just a vendor.",
    tools: ["Cloud architecture", "Systems audit"],
  },
};

export const servicesHero = {
  heading: "Architecting Kinship Through Code.",
  body: "We engineer robust, scalable software systems grounded in regional stability and technical mastery. Building digital infrastructure that endures.",
};

export const portfolioHero = {
  heading: "Every project is a testament to innovation.",
  body: "A journey into excellence, and a canvas painted with the strokes of transformative technology.",
};

export const contactHero = {
  heading: "Contact us for any questions.",
  body: "Ready to innovate together? Have a project in mind or curious about our services? Contact us, and let's start a conversation. We're here to turn your ideas into extraordinary solutions.",
};

export const contactInfo = [
  { label: "Email", value: "info@takkinship.com", href: "mailto:info@takkinship.com" },
  { label: "Office", value: "Kakoba Division, Mbarara, Uganda" },
  { label: "Phone", value: "+256 700 000 000", href: "tel:+256700000000" },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What industries does TAK Kinship specialize in?",
    // PLACEHOLDER: gap G6. Figma's FAQ Accordion components ship with no
    // answer text at all (every instance was left in its "Collapsed" state
    // with no body). Answer drawn from the sectors already listed on Home.
    answer:
      "We build for Fintech, Agriculture, Education, Healthcare, Retail, Logistics, Media, and Government, the sectors moving East Africa.",
  },
  {
    question: "How can I contact TAK Kinship?",
    // PLACEHOLDER: gap G6.
    answer:
      "Email info@takkinship.com, call +256 700 000 000, or use the form on this page. We're based in Kakoba Division, Mbarara, Uganda.",
  },
  {
    question: "What is the project timeline for TAK Kinship?",
    // PLACEHOLDER: gap G6.
    answer:
      "Timelines depend on scope. We start with a Discover phase to map your goals, then give a concrete timeline before any build work begins.",
  },
  {
    question: "Does TAK Kinship offer post-launch support?",
    // PLACEHOLDER: gap G6.
    answer:
      "Yes. Support is the last step of our process: ongoing maintenance and iteration once your product is live.",
  },
  {
    question: "What technologies does TAK Kinship use?",
    // PLACEHOLDER: gap G6.
    answer:
      "Flutter and Firebase for mobile, Python, Django, and PostgreSQL for backends, and JavaScript, React, and HTML for the web, chosen per project.",
  },
  {
    question: "Can TAK Kinship help with digital marketing?",
    // PLACEHOLDER: gap G6.
    answer:
      "Not directly. We focus on custom software, mobile apps, web development, cloud, UI/UX, and IT consulting.",
  },
];

export const sectors = [
  "Fintech",
  "Agriculture",
  "Education",
  "Healthcare",
  "Retail",
  "Logistics",
  "Media",
  "Government",
];
