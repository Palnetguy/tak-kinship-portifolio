// Copy sourced from David's Figma file (TAK Redesign, "Web pages" page) unless marked PLACEHOLDER.

export const problems = [
  {
    icon: "plugOff" as const,
    title: "Off-the-shelf mismatch",
    body: "Generic solutions force you to adapt your workflows to their limitations.",
  },
  {
    icon: "hourglass" as const,
    title: "Slow, unreliable systems",
    body: "Legacy code and poor architecture lead to downtime and lost revenue.",
  },
  {
    icon: "map" as const,
    title: "No clear path to launch",
    body: "Without strategic guidance, projects stall and budgets inflate.",
  },
];

// `plain` is a benefit-led, jargon-free line added per Yona's walkthrough note
// (2026-08-10): terms like "IT Consulting" and "Cloud" read as jargon to a
// non-technical visitor who still needs to understand the offer. It sits under
// the existing `body` and says, in everyday words, what the service gets the
// client. Truthful to what TAK actually does, no invented outcomes or metrics.
export const services = [
  {
    icon: "code" as const,
    title: "Custom Software",
    body: "End-to-end systems built around your exact processes, not the other way round.",
    plain: "So your team keeps working the way it already does, instead of bending to fit someone else's tool.",
  },
  {
    icon: "phone" as const,
    title: "Mobile Apps",
    body: "Native-feeling apps that empower communities and scale with your users.",
    plain: "So your customers can reach you from the phone in their pocket, wherever they are.",
  },
  {
    icon: "globe" as const,
    title: "Web Development",
    body: "Responsive, performant websites and web apps built for real business goals.",
    plain: "So visitors get a fast, reliable site that works on any device and turns interest into enquiries.",
  },
  {
    icon: "cloud" as const,
    title: "Cloud",
    body: "Architecture, deployment, and migration for reliability at scale.",
    plain: "So your systems stay online and steady, even as more people start using them.",
  },
  {
    icon: "bulb" as const,
    title: "IT Consulting",
    body: "Strategy-to-execution guidance for teams modernizing their tech stack and operations.",
    plain: "So you know exactly what to build or change next, without the technical guesswork.",
  },
  {
    icon: "palette" as const,
    title: "UI/UX Design",
    body: "From wireframes to polished designs, we make interactions leave a lasting impression.",
    plain: "So people understand your product the moment they open it.",
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
  projectId?: string;
  slug: string;
  name: string;
  category: "MOBILE APP" | "Desktop App" | "Web App";
  blurb: string;
  stack: string[];
  /**
   * Card screenshot, 426x225 in the design (exported at 2x).
   *
   * The DesignAgent bridge was down, so these were cut straight out of the 4x
   * reference export `~/Downloads/David/Home.png` at the measured card bounds
   * (photo band y 243-468 and 750-975.5, columns 48/506.2/965 each 425.2
   * wide, 1.5px inset to clear the card border). That is the same pixel data
   * Figma would have handed back for an image fill, so re-exporting through
   * the bridge later is a refinement, not a correction.
   */
  image: string;
  /** Shown as "Timeline" in the detail overlay. Only set where known. */
  year?: string;
  /** Shown as "Visit the app". Only set where a real live URL exists. */
  url?: string;
  /** Download links for app builds, when the backend exposes them. */
  downloads?: {
    label: string;
    href: string;
    version?: string;
    description?: string;
    releasedOn?: string;
  }[];
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
    image: "/portfolio/desn.jpg",
    // The Project Details overlay states 2024 for Desn. No other project has
    // a stated timeline, so none is invented for the other five.
    year: "2024",
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
    image: "/portfolio/stec-sms.jpg",
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
    image: "/portfolio/telxul.jpg",
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
    image: "/portfolio/projector23.jpg",
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
    image: "/portfolio/tak-poultry-farm.jpg",
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
    image: "/portfolio/tasse-fm.jpg",
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
    icon: "sparkle" as const,
    title: "Innovation",
    body: "Pushing the boundaries of technology to deliver future-proof, scalable solutions.",
  },
  {
    icon: "shield" as const,
    title: "Integrity",
    body: "Transparent communication and honest pricing from kickoff to deployment.",
  },
  {
    icon: "pulse" as const,
    title: "Impact",
    body: "Building digital tools that drive measurable growth and empower local communities.",
  },
  {
    icon: "users" as const,
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

// Plain-language intro above the project grid (Yona's non-technical-audience
// note, 2026-08-10). The hero copy is deliberately evocative; this line says,
// in everyday words, what a visitor is looking at and how to start their own
// project. Truthful to the real work shown below.
export const portfolioIntro =
  "Below are real apps and systems we have built for businesses across East Africa, from shops and schools to farms and radio. Filter by the kind of product you have in mind, and if you see something close to yours, start a project and we will talk it through.";

export const contactHero = {
  heading: "Contact us for any questions.",
  body: "Ready to innovate together? Have a project in mind or curious about our services? Contact us, and let's start a conversation. We're here to turn your ideas into extraordinary solutions.",
};

export const contactInfo = [
  { label: "Email", value: "info@takkinship.com", href: "mailto:info@takkinship.com" },
  { label: "Office", value: "Kakoba Division, Mbarara, Uganda" },
  { label: "Phone", value: "+256 700 000 000", href: "tel:+256700000000" },
];

// DEMO PLACEHOLDER testimonials (KingFizzy, 2026-08-11). The home-page
// testimonial section normally renders ONLY when TAK's backend returns real
// quotes, so a real visitor never sees an invented one. For the Wednesday
// walkthrough the section needs to show its layout before any real quotes
// exist, so these stand in. They are deliberately QUALITATIVE with no hard
// numbers or real client names (fictitious first names + generic sectors from
// the "We Build For" list), so nothing here is a checkable false claim. The
// live backend, when Martin wires the key, takes priority over these. Replace
// with real client quotes before this is presented as production content.
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image?: string;
};

export const placeholderTestimonials: Testimonial[] = [
  {
    quote:
      "We came to TAK with a rough idea and a tight budget. They asked the right questions first, then built exactly what our team needed instead of what was easy. The app simply fits how we already work.",
    author: "Grace N.",
    role: "Operations Manager, Retail",
  },
  {
    quote:
      "What stood out was the communication. We always knew where the project stood, and when we hit a snag they were honest about it and fixed it quickly. It felt like working with our own team.",
    author: "Samuel A.",
    role: "Founder, Education",
  },
  {
    quote:
      "They understood that our staff are not technical. The system they delivered is simple enough that everyone picked it up in a day, and it has held up as we have grown.",
    author: "Miriam T.",
    role: "Director, Agriculture",
  },
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

// Order and icons traced from the "We Build For" grid, Home.png y 6008-6713:
// 4 x 2, each tile leading with a lined icon above the label.
export const sectors = [
  { icon: "card" as const, label: "Fintech" },
  { icon: "leaf" as const, label: "Agriculture" },
  { icon: "graduation" as const, label: "Education" },
  { icon: "stethoscope" as const, label: "Healthcare" },
  { icon: "bag" as const, label: "Retail" },
  { icon: "truck" as const, label: "Logistics" },
  { icon: "play" as const, label: "Media" },
  { icon: "bank" as const, label: "Government" },
];
