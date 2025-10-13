import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Frontend and Full-Stack Developer with 2 years of experience building modern web applications.`;
  const aboutText = `As a passionate Frontend and Full-Stack Developer, I specialize in building modern web applications using React, Next.js, and TypeScript.

Key skills:
🚀 Frontend: React.js, Next.js, TypeScript, Tailwind CSS
⚙️ Animations: Framer Motion, GSAP
☁️ Backend: Node.js, Supabase, Firebase
🗄️ Database: MongoDB,My sql

Professional Experience:
• Freelance Developer (2024 - Present)
  - Built websites and web apps for startups
  - Technologies: React.js, Next.js, TypeScript, Supabase

• Junior Developer at Sheetsway.com (2024 - 2025)
  - Developed full-stack applications using React.js and Supabase`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with Purpose, Built to Scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src="images/akshay-ai.png"
          alt="Akshay Pratap Singh"
          className="w-md rounded-3xl border-2 border-neutral-700/35"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;