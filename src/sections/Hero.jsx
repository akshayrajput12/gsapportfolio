import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import ScrollFrameAnimation from "../components/ScrollFrameAnimation";
import ResumeModal from "../components/ResumeModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const heroText = `Frontend and Full-Stack Developer with 2 years of experience building industry-level websites and web applications. Proven track record of delivering scalable, maintainable code using the latest tools and frameworks. Expert in leveraging AI tools to enhance development efficiency and product quality.`;

  const resumeUrl = "/Akshay_Pratap_Singh_Resume.pdf";

  useGSAP(() => {
    // Hero animations
    gsap.from(".hero-action-buttons", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.5,
      ease: "power2.out"
    });
  });

  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen overflow-hidden">
      {/* Scroll-based frame animation background */}
      <ScrollFrameAnimation totalFrames={120} />
      
      {/* Hero Content overlay */}
      <div className="relative z-10 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent">
        <AnimatedHeaderSection
          subTitle={"Frontend & Full-Stack Developer"}
          title={"Akshay Pratap Singh"}
          text={heroText}
          textColor={"text-text"}
        />
        
        {/* Resume Actions */}
        <div className="hero-action-buttons px-10 pb-20 flex flex-wrap gap-4 justify-end relative z-20">
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 group"
          >
            <Icon icon="mdi:eye-outline" className="text-lg group-hover:scale-110 transition-transform" />
            View Resumé
          </button>
          
          <a
            href={resumeUrl}
            download="Akshay_Pratap_Singh_Resume.pdf"
            className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all active:scale-95"
          >
            <Icon icon="mdi:download" className="text-lg" />
            Download
          </a>
        </div>
      </div>

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        resumeUrl={resumeUrl} 
      />
    </section>
  );
};

export default Hero;