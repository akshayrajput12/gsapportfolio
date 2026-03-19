import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const text = `Full-stack web applications built with modern technologies showcasing React, Node.js, and database expertise.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".project-item", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".project-container",
        start: "top 80%",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    if (window.innerWidth >= 768) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    if (window.innerWidth >= 768) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power3.in",
      });
    }
    setCurrentIndex(null);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    
    // Smoothly track mouse with a slight float effect
    if (moveX.current && moveY.current) {
        moveX.current(clientX + 20);
        moveY.current(clientY + 20);
    }
  };

  const handleProjectClick = (url) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <section id="work" className="relative flex flex-col min-h-screen py-20 bg-transparent overflow-hidden">
      <AnimatedHeaderSection
        subTitle={"Portfolio & Experience"}
        title={"Works"}
        text={text}
        textColor={"text-text"}
        withScrollTrigger={true}
      />
      
      <div
        className="project-container relative flex flex-col font-light mt-10"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-item relative group py-8 md:py-12 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/[0.02]"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleProjectClick(project.href)}
          >
            {/* Background Overlay */}
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 pointer-events-none transition-opacity"
            />

            <div className="relative z-10 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* ID and Basic Info */}
              <div className="flex items-center gap-8 md:w-1/2">
                <span className="text-[10px] font-mono text-white/20 tracking-[0.5em]">
                  0{project.id}
                </span>
                <div className="flex flex-col gap-1">
                   <h2 className="text-3xl md:text-5xl lg:text-7xl font-thin text-white tracking-widest uppercase transition-all group-hover:translate-x-6">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {project.frameworks.map((f) => (
                      <span key={f.id} className="text-[9px] font-bold text-white/30 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-sm">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action/Icon */}
              <div className="flex items-center gap-4 text-white/40 group-hover:text-white transition-colors self-end md:self-center">
                 <span className="text-[10px] uppercase font-bold tracking-widest hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">Launch Manifest</span>
                 <Icon icon="lucide:arrow-up-right" className="text-xl md:text-4xl transform group-hover:rotate-45 transition-transform" />
              </div>
            </div>

            {/* Mobile Preview Container */}
            <div className="md:hidden mt-10 px-6">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                 <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <p className="text-[10px] text-white/80 line-clamp-2 leading-relaxed">
                     {project.description}
                   </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Desktop Floating Preview */}
        <div
          ref={previewRef}
          className="fixed pointer-events-none z-[100] w-[480px] aspect-video rounded-2xl overflow-hidden border border-white/30 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] opacity-0 scale-90 will-change-transform hidden lg:block backdrop-blur-md"
        >
          {currentIndex !== null && (
            <div className="relative w-full h-full bg-[#0a0a0a]">
              <img
                src={projects[currentIndex].image}
                alt="Project Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;