import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    gsap.to("#about-title-1", {
      xPercent: -20,
      scrollTrigger: {
        target: "#about-title-1",
        scrub: true,
      },
    });
    gsap.to("#about-title-2", {
      xPercent: 30,
      scrollTrigger: {
        target: "#about-title-2",
        scrub: true,
      },
    });
    gsap.to("#about-title-3", {
      xPercent: -50,
      scrollTrigger: {
        target: "#about-title-3",
        scrub: true,
      },
    });
    gsap.to("#about-title-4", {
      xPercent: 50,
      scrollTrigger: {
        target: "#about-title-4",
        scrub: true,
      },
    });
    gsap.to("#about-title-5", {
      xPercent: -30,
      scrollTrigger: {
        target: "#about-title-5",
        scrub: true,
      },
    });
  });

  return (
    <section id="about" className="relative mt-16 overflow-hidden font-light leading-snug text-center mb-32 contact-text-responsive">
      <div id="about-title-1" className="flex items-center justify-center gap-3 -translate-x-32">
        <p className="font-normal">2+ Years</p>
        <div className="w-8 h-0.5 md:w-24 bg-gold" />
        <p>Experience</p>
      </div>
      
      <div id="about-title-2">
        <p>Frontend & Full-Stack Developer</p>
      </div>
      
      <div id="about-title-3" className="flex items-center justify-center gap-3 translate-x-48">
        <p>React & Next.js</p>
        <div className="w-8 h-0.5 md:w-24 bg-gold" />
        <p>TypeScript</p>
      </div>
      
      <div id="about-title-4" className="flex items-center justify-center gap-3 -translate-x-24">
        <p>Building Modern</p>
        <div className="w-8 h-0.5 md:w-24 bg-gold" />
        <p>Web Solutions</p>
      </div>
      
      <div id="about-title-5">
        <p>Crafting Digital Experiences</p>
      </div>
    </section>
  );
};

export default About;