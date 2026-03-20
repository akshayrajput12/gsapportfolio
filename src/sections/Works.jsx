import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects, getDynamicThumbnail } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Preview card dimensions
const PREVIEW_W = 420;
const PREVIEW_H = Math.round(PREVIEW_W * (9 / 16));
const OFFSET_X = 28;   // gap to the right of the cursor
const OFFSET_Y = -60;   // slightly above cursor centre

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const hasMovedRef = useRef(false); // tracks whether we've set initial position

  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const text = `Full-stack web applications built with modern technologies showcasing React, Node.js, and database expertise.`;

  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    // Drive left/top (viewport-relative) with quickTo — NOT transform x/y.
    // This avoids the transform-origin jump that caused the offset bug.
    moveX.current = gsap.quickTo(previewRef.current, "left", {
      duration: 0.55,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "top", {
      duration: 0.65,
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

  // Clamp so the card never leaves the visible viewport
  const clampX = (x) => Math.min(x, window.innerWidth - PREVIEW_W - 16);
  const clampY = (y) =>
    Math.max(16, Math.min(y, window.innerHeight - PREVIEW_H - 16));

  // Instantly place the card at the cursor before the first animated move.
  // Without this, the card animates from (−9999, −9999) across the screen.
  const teleport = (clientX, clientY) => {
    gsap.set(previewRef.current, {
      left: clampX(clientX + OFFSET_X),
      top: clampY(clientY + OFFSET_Y),
    });
  };

  const handleMouseEnter = (index) => {
    setCurrentIndex(index);
    hasMovedRef.current = false; // force teleport on next mousemove

    const el = overlayRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: 1, duration: 0.35, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (index) => {
    const el = overlayRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: 0, duration: 0.35, ease: "power2.in" });
    }

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.3,
      ease: "power2.in",
    });

    hasMovedRef.current = false;
    setCurrentIndex(null);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;

    if (!hasMovedRef.current) {
      // First move after entering a row: snap into position, then reveal
      teleport(clientX, clientY);
      hasMovedRef.current = true;

      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      // All subsequent moves: smooth animated follow
      moveX.current?.(clampX(clientX + OFFSET_X));
      moveY.current?.(clampY(clientY + OFFSET_Y));
    }
  };

  const handleProjectClick = (url) => {
    if (url) window.open(url, "_blank");
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.frameworks.some((f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <section
      id="work"
      className="relative flex flex-col min-h-screen py-20 bg-transparent overflow-hidden"
    >
      <AnimatedHeaderSection
        subTitle={"Portfolio & Experience"}
        title={"Works"}
        text={text}
        textColor={"text-text"}
        withScrollTrigger={true}
      />

      {/* Search Input */}
      <div className="relative z-20 px-6 md:px-12 mt-12 mb-4">
        <div className="flex items-center gap-4 max-w-xl mx-auto md:mx-0 border-b border-white/10 pb-2 transition-all focus-within:border-white/40">
          <Icon icon="lucide:search" className="text-white/30 text-xl" />
          <input
            type="text"
            placeholder="Search projects, tech stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white font-thin text-lg md:text-xl tracking-widest placeholder:text-white/10 placeholder:uppercase placeholder:text-xs"
          />
        </div>
      </div>

      <div
        className="project-container relative flex flex-col font-light mt-4"
        onMouseMove={handleMouseMove}
      >
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="project-item relative group py-8 md:py-12 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/[0.02]"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleProjectClick(project.href)}
          >
            {/* Row background overlay */}
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 pointer-events-none"
            />

            <div className="relative z-10 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* ID + title + tags */}
              <div className="flex items-center gap-8 md:w-1/2">
                <span className="text-[10px] font-mono text-white/20 tracking-[0.5em]">
                  {project.id < 10 ? `0${project.id}` : project.id}
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-thin text-white tracking-widest uppercase transition-transform duration-500 group-hover:translate-x-6">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {project.frameworks.map((f) => (
                      <span
                        key={f.id}
                        className="text-[9px] font-bold text-white/30 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-sm"
                      >
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-4 text-white/40 group-hover:text-white transition-colors self-end md:self-center">
                <span className="text-[10px] uppercase font-bold tracking-widest hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch Manifest
                </span>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="text-xl md:text-4xl transform group-hover:rotate-45 transition-transform"
                />
              </div>
            </div>

            {/* Mobile-only inline preview */}
            <div className="md:hidden mt-10 px-6">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={
                    project.image === "dynamic"
                      ? getDynamicThumbnail(project.href)
                      : project.image
                  }
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

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center opacity-30 tracking-[0.5em] uppercase text-xs">
            No projects found matching "{searchTerm}"
          </div>
        )}

        {/*
          ── Desktop floating preview card ──────────────────────────────────
          Fixes applied vs original:
          1. Driven by `left`/`top` (not gsap x/y / transform) so the card
             position is purely viewport-relative with no transform-origin offset.
          2. Starts at left:-9999 / top:-9999 (offscreen) so it never flashes
             at (0,0) before the first mousemove.
          3. `teleport()` snaps it to the real cursor position before the
             fade-in, eliminating the cross-screen slide on first enter.
          4. `scale` is reset to 1 on enter and 0.92 on leave — pure opacity
             + scale, no positional conflict with the quickTo drivers.
        */}
        <div
          ref={previewRef}
          className="fixed pointer-events-none z-[100] rounded-2xl overflow-hidden border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7)] opacity-0 will-change-transform hidden lg:block"
          style={{
            width: PREVIEW_W,
            height: PREVIEW_H,
            left: -9999,
            top: -9999,
            transform: "scale(0.92)",
          }}
        >
          {currentIndex !== null && filteredProjects[currentIndex] && (
            <div className="relative w-full h-full bg-[#0a0a0a]">
              <img
                src={
                  filteredProjects[currentIndex].image === "dynamic"
                    ? getDynamicThumbnail(filteredProjects[currentIndex].href)
                    : filteredProjects[currentIndex].image
                }
                alt={filteredProjects[currentIndex].name}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
              <div className="absolute bottom-0 inset-x-0 px-5 py-4">
                <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.35em] truncate">
                  {filteredProjects[currentIndex].name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


export default Works;