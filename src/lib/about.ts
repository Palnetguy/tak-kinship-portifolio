/**
 * About page content.
 *
 * Every string here is REAL, read off the live takkinship.com /about page as
 * rendered in a browser (the copy is not in the JS bundle; the team comes from
 * the company's own API at runtime, so it had to be read from the DOM).
 *
 * This replaces the four-person array that IS in the bundle. That array is
 * demo data: all four members share one image literally named
 * `testProfilePic`, and the names include a famous footballer. None of it
 * ships. The six people below are the real team, in the order the live site
 * lists them.
 *
 * BIOS: experience-first DRAFTS, pending each member's confirmation.
 * The team approved reframing the roster copy from "what each member can do"
 * toward each member's experience working at TAK (2026-08-10 walkthrough), and
 * KingFizzy authorized replacing the copy with drafts for the Wednesday
 * demo. Real facts are kept (roles, self-taught frontend, Makerere CS student,
 * Django backend, two years at TAK); nothing checkable is invented. Each
 * person should confirm or adjust their own words before this is treated as
 * final. The previous verbatim bios (read off the live takkinship.com /about
 * DOM) are preserved in git history at commit d9ae8a2 if a revert is needed.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Tusingwire Martin",
    role: "Founder & Team Leader",
    bio: "Building TAK Kinship has been the most rewarding work of my career. What I value most is watching people on this team grow, from their first commit to leading projects of their own, and the trust our clients place in us to get their ideas right. We stay small on purpose, because it keeps us close to the work and close to each other. Every project we take on is a chance to prove that software built with real care changes what a business can do.",
    image: "/team/martin.jpg",
  },
  {
    name: "Masaba Ian Samuel",
    role: "Head of Frontend",
    bio: "My years at TAK Kinship have shaped how I build. I came in as a self-taught developer and grew into leading our frontend work across web, desktop and mobile. What keeps me here is the room to take a messy, half-formed idea and turn it into an interface that feels effortless, and a team that reviews each other's work honestly. Shipping something a client genuinely enjoys using is still the best part of the job.",
    image: "/team/ian.jpg",
  },
  {
    name: "Yonah Odhiambo",
    role: "Backend Developer",
    bio: "Working on the backend here has taught me that reliable infrastructure is quiet work everyone feels. I build the server-side systems our apps run on, mostly with Django, and TAK Kinship has pushed me to care about doing that well rather than just doing it fast. The team's curiosity is contagious, and it is part of why I keep exploring where AI can fit into what we build next.",
    image: "/team/yonah.jpg",
  },
  {
    name: "Fuad Michael Lawal",
    role: "UI/UX Designer",
    bio: "Designing at TAK Kinship means I get to sit with a real problem before drawing a single screen. Over my time here I have grown from making things look right to making them make sense, and building design systems the whole team can rely on. The moments I chase are the ones where someone moves through what we made without a second thought, because that ease is the whole point of the work.",
    image: "/team/fuad.jpg",
  },
  {
    name: "Kazibwe David Nelson",
    role: "UI/UX Designer",
    bio: "I joined TAK Kinship two years ago while studying Computer Science at Makerere University, and it is where my love of design turned into a real craft. The support here, honest feedback and genuine responsibility early on, has done more for my growth than anything else. Getting to design products that make a difference in our own communities is what makes this feel like far more than a job.",
    image: "/team/david.jpg",
  },
  {
    name: "Lawrence Odhiambo",
    role: "Frontend Developer",
    bio: "The environment is what I would tell anyone about first. From my very first week at TAK Kinship the team had my back, and that support is how I have grown as a developer. We work in fast, honest cycles, learning and adjusting as we go, and it has given me a real sense of ownership over what we ship. Being trusted to do good work, alongside people who do the same, is why I am proud of what we build.",
    image: "/team/lawrence.jpg",
  },
];

/** Verbatim from the live site's "A word from our CEO" block. */
export const ceo = {
  eyebrow: "A word from our CEO",
  name: "Tusingwire Martin",
  role: "Founder & CEO",
  image: "/team/martin.jpg",
  quote: [
    "Ultimately, TAK Kinship is about building a community. A community where technology serves humanity, where innovation has a heart, and where every step we take brings us closer to a future we can all believe in.",
    "I'm genuinely excited about the journey ahead, and I invite you to join us in making this vision a reality. Let's build something truly meaningful, together.",
  ],
};

export const aboutHero = {
  eyebrow: "About",
  heading: "About Us",
  body: "In the vast tapestry of the web, we don't just create technology; we compose symphonies of connection.",
};

/** The live site's four differentiators. The "7+ years" figure is theirs and
 *  is stated on their own About page, so it is a claim they already make. */
export const experience = {
  heading: "We are here with 7+ years of experience",
  body: "With 7+ years of seasoned experience, we bring proficiency to every project. Yet, we embrace each new challenge with a commitment to continual learning, ensuring our expertise evolves with the ever-changing landscape of technology.",
  uniqueHeading: "Why are we unique?",
  uniqueBody:
    "We are unique because we are a team of passionate developers who have been in the industry for 7+ years. We have a proven track record of delivering high-quality software solutions on time and on budget. Our team is dedicated to providing exceptional customer service and ensuring that our clients are completely satisfied with our work.",
};

export const differentiators = [
  {
    icon: "shield" as const,
    title: "Industry Expertise",
    body: "Benefit from our in-depth knowledge and understanding of your industry to build top-notch custom solutions tailored to your business demands.",
  },
  {
    icon: "sparkle" as const,
    title: "Customized Solutions",
    body: "We offer tailored solutions that cater to your specific business needs, ensuring that our work aligns with your goals and requirements.",
  },
  {
    icon: "pulse" as const,
    title: "Reliable and Efficient",
    body: "With our expertise and cutting-edge technology, we ensure that your project is completed on time and with the highest level of quality, allowing you to focus on your core business.",
  },
  {
    icon: "users" as const,
    title: "Transparency and Communication",
    body: "Our team is dedicated to providing you with regular updates and open communication throughout the project, ensuring that you are always informed and up-to-date on the progress.",
  },
];
