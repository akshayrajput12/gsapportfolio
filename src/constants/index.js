// index.js

export const getDynamicThumbnail = (targetUrl) => {
  if (!targetUrl) return "";
  // Using mircrolink for dynamic screenshots as requested ("just like vercel take and show us thumbail")
  return `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
};

export const servicesData = [
  {
    title: "Frontend Development",
    description:
      "Creating engaging, responsive user interfaces with modern JavaScript frameworks. I specialize in React.js, Next.js, and animation libraries like Framer Motion and GSAP to build visually stunning and highly interactive web applications.",
    items: [
      {
        title: "React.js & Next.js",
        description: "(Component-based architecture, hooks, state management, SSR)",
      },
      {
        title: "Animation & Interactive UI",
        description: "(Framer Motion, GSAP, Tailwind CSS, responsive design)",
      },
      {
        title: "JavaScript & TypeScript",
        description: "(ES6+, TypeScript, modern JS features, best practices)",
      },
    ],
  },
  {
    title: "Full Stack Web Development",
    description:
      "Building complete web applications from frontend to backend. I create custom full-stack solutions using React, Node.js, and modern frameworks with clean architecture, optimized performance, and seamless user experiences.",
    items: [
      {
        title: "Backend API Development",
        description: "(Node.js, Express, REST APIs, Supabase, Firebase)",
      },
      {
        title: "Frontend Development",
        description: "(React.js, Next.js, TypeScript, Responsive Design)",
      },
      {
        title: "Database Management",
        description: "(MongoDB, Supabase, Firebase, Database Design)",
      },
    ],
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Developing robust e-commerce platforms with secure payment integration. I build user-friendly shopping interfaces and comprehensive admin panels for inventory and order management, ensuring seamless and trusted user experiences.",
    items: [
      {
        title: "E-Commerce Platforms",
        description: "(Shopping interfaces, product catalogs, user accounts)",
      },
      {
        title: "Payment Integration",
        description: "(Razorpay, secure payment processing, checkout flows)",
      },
      {
        title: "Admin Dashboards",
        description: "(Inventory management, order tracking, analytics)",
      },
    ],
  },
  {
    title: "AI-Enhanced Development",
    description:
      "Leveraging AI tools to enhance development efficiency and product quality. I integrate AI solutions to optimize workflows, automate tasks, and improve the overall development process for faster, higher-quality results.",
    items: [
      {
        title: "AI Tool Integration",
        description: "(Development efficiency, code optimization, automation)",
      },
      {
        title: "Quality Enhancement",
        description: "(Code review assistance, testing, performance optimization)",
      },
      {
        title: "Continuous Learning",
        description: "(Adapting to cutting-edge technologies, skill development)",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Orchi Animated Website",
    description:
      "Developed a highly animated, visually engaging website using modern animation frameworks such as Framer Motion and GSAP, enhancing user interaction and retention.",
    href: "https://github.com/akshayrajput12/Ochi-Locomotive-react-based-project-",
    image: "/assets/projects-optimized/orchi.webp",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "GSAP" },
      { id: 3, name: "Framer Motion" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "CrazySnitch E-Commerce Platform",
    description:
      "Built an e-commerce platform for a clothing brand, featuring a user-friendly shopping interface and a comprehensive admin panel for inventory and order management. Integrated Razorpay for secure payment processing.",
    href: "https://github.com/akshayrajput12/crazysnitch-fashion-hub",
    image: "/assets/projects-optimized/crazysnitch.webp",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Typescript" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Razorpay" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Sheetsway AI Audit Platform",
    description:
      "Built full-stack software for clients using React.js, Supabase, Tailwind, and Framer Motion. Helped integrate payments on the platform and built the Sheetsway website UI from scratch.",
    href: "",
    image: "/assets/projects-optimized/sheetsway.webp",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next js" },
      { id: 2, name: "Supabase" },
      { id: 3, name: "Tailwind CSS" },
      { id: 4, name: "Framer Motion" },
    ],
  },
  {
    id: 4,
    name: "Bioclinpharm Pharmaceutical Website",
    description:
      "Created a professional website for Bioclinpharm showcasing their pharmaceutical products and services with a clean, responsive design that meets industry standards.",
    href: "https://www.bioclinpharm.com/",
    image: "/assets/projects-optimized/bioclinpharm.webp",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React js" },
      { id: 2, name: "CSS3" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "Bootstrap" },
    ],
  },
  {
    id: 5,
    name: "CampusCash Student Platform",
    description:
      "Developed a comprehensive student financial management platform featuring expense tracking, budget planning, and financial insights to help students manage their finances effectively.",
    href: "https://campuscashh.vercel.app/",
    image: "/assets/projects-optimized/campuscash.webp",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Supabase" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 6,
    name: "Marketing Portfolio Website",
    description:
      "Created a visually stunning marketing portfolio website showcasing services, case studies, and client testimonials with smooth animations and responsive design.",
    href: "https://marketing-portfolio-website.vercel.app/",
    image: "/assets/projects-optimized/marketing landing page.webp",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Framer Motion" },
      { id: 3, name: "GSAP" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 7,
    name: "The Super Sweets E-Commerce",
    description:
      "Developed a vibrant and engaging e-commerce platform for The Super Sweets, featuring product catalogs, shopping cart functionality, and secure payment processing.",
    href: "https://www.thesupersweets.com/",
    image: "/assets/projects-optimized/supersweets.webp",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Stripe" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 8,
    name: "Chronicle Exhibits",
    description:
      "A complete, dynamically built platform for Chronicle Exhibits using Next.js and Supabase. Features a robust admin panel built with React.js, advanced state management with Zustand, and smooth animations powered by Framer Motion. Every single interaction and page is fully dynamic, ensuring a premium digital exhibition experience.",
    href: "https://chronicleexhibits.eu/",
    image: "dynamic", // Mark as dynamic
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Supabase" },
      { id: 3, name: "Zustand" },
      { id: 4, name: "TypeScript" },
      { id: 5, name: "Framer Motion" },
      { id: 6, name: "React JS" },
    ],
  },
  {
    id: 9,
    name: "Greater Infra Projects",
    description:
      "A sophisticated real estate platform for Greater Infra Projects, one of Hyderabad's leading developers. The website showcases residential and commercial ventures with a focus on transparency and quality, featuring virtual home tours and a user-centric property catalog.",
    href: "https://greaterinfraprojects.in/",
    image: "dynamic",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Framer Motion" },
      { id: 4, name: "GSAP" },
    ],
  },
  {
    id: 10,
    name: "Karostartup Ecosystem",
    description:
      "A comprehensive digital hub for the Indian startup ecosystem. Karostartup connects founders with freelancers, provides the latest funding news, and offers a wealth of resources and growth strategies for entrepreneurs seeking to scale their ventures.",
    href: "https://www.karostartup.in/",
    image: "dynamic",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Supabase" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 11,
    name: "HireSense AI Platform",
    description:
      "An innovative AI-enabled Talent Intelligence Platform. HireSense AI leverages machine learning for skill matching, predictive analytics for workforce planning, and talent market intelligence to provide enterprises with a competitive edge in hiring.",
    href: "https://hiresenseaii.vercel.app/",
    image: "dynamic",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Vercel" },
      { id: 3, name: "AI/ML" },
      { id: 4, name: "Tailwind CSS" },
      { id: 5, name: "Framer Motion" },
    ],
  },
];


export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/1akshay/" },
  { name: "GitHub", href: "https://github.com/akshayrajput12" },
];