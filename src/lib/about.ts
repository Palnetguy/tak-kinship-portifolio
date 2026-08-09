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
 * Bios are verbatim, with only sentence casing applied to the roles (the live
 * site renders them lowercase via CSS) and the standing grammar rule applied:
 * a missing space after a comma in Yonah's line, and "Tak Kinship" corrected
 * to "TAK Kinship" in Ian's.
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
    bio: "It's a privilege to work alongside this exceptional team. I've had the honour of witnessing many of our members grow and evolve, and their dedication and passion continually inspire me. At TAK Kinship, we believe in building more than just software, we build people. We cherish the opportunity to mentor and collaborate, fostering an environment where everyone can thrive. Though we may be a small team, the impact we create together is truly remarkable, and it's a testament to the talent and heart each individual brings to the table.",
    image: "/team/martin.jpg",
  },
  {
    name: "Masaba Ian Samuel",
    role: "Head of Frontend",
    bio: "I'm a self-taught front-end developer passionate about crafting intuitive, high-performance user interfaces across web, desktop, and mobile platforms. As the Head of Frontend at TAK Kinship, I specialize in transforming complex ideas into elegant, user-centered digital experiences using modern technologies. With a focus on clean design, scalable architecture, and collaborative development, I strive to build functional and enjoyable products.",
    image: "/team/ian.jpg",
  },
  {
    name: "Yonah Odhiambo",
    role: "Backend Developer",
    bio: "I focus on building robust and scalable server-side solutions. My passion for crafting efficient infrastructure is truly amplified by working with the Django framework here. Being part of TAK Kinship has deepened my commitment to creating reliable backend systems that power meaningful applications. Beyond my core development work, I'm also keenly following the exciting advancements in Artificial Intelligence, a curiosity that TAK Kinship's innovative environment encourages.",
    image: "/team/yonah.jpg",
  },
  {
    name: "Fuad Michael Lawal",
    role: "UI/UX Designer",
    bio: "As a UI/UX Designer at TAK Kinship, I'm passionate about crafting intuitive and human-centered digital experiences. My focus is on blending strategic insight with sharp design execution to create user-friendly interfaces and comprehensive design systems. At TAK Kinship, our design team serves as the creative compass for user experience, and I'm proud to contribute to building products that are not only usable but truly memorable and aim to delight.",
    image: "/team/fuad.jpg",
  },
  {
    name: "Kazibwe David Nelson",
    role: "UI/UX Designer",
    bio: "As a UI Designer at TAK Kinship and a Computer Science student at Makerere University, my passion for design, cultivated since high school, continues to flourish. I'm incredibly excited to contribute to a team that leverages technology for meaningful impact within our local communities. Joining TAK Kinship two years ago has been instrumental in my growth, providing invaluable support and experiences that are shaping my craft. It's more than just a job; it's an opportunity to be part of impactful innovation, and I'm eager to see what we achieve together.",
    image: "/team/david.jpg",
  },
  {
    name: "Lawrence Odhiambo",
    role: "Frontend Developer",
    bio: "What truly sets my experience apart here is the incredible environment at TAK Kinship. From day one, the collaborative spirit of the team and the supportive leadership have been invaluable in honing my skills and encouraging innovation. We operate with a strong agile mindset, which means we're constantly learning, adapting, and delivering user-focused solutions efficiently. Being part of a team that values collaboration and continuous improvement has not only made me a better developer but also instilled a real sense of ownership and pride in the work we do.",
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
