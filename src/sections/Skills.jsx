import { useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

// ─── data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: "React", icon: "logos:react", cat: "frontend" },
  { name: "Next.js", icon: "logos:nextjs-icon", cat: "frontend" },
  { name: "TypeScript", icon: "logos:typescript-icon", cat: "frontend" },
  { name: "Framer Motion", icon: "logos:framer", cat: "frontend" },
  { name: "GSAP", icon: "logos:gsap", cat: "frontend" },
  { name: "HTML5", icon: "logos:html-5", cat: "frontend" },
  { name: "CSS3", icon: "logos:css-3", cat: "frontend" },
  { name: "JavaScript", icon: "logos:javascript", cat: "frontend" },
  { name: "Node.js", icon: "logos:nodejs-icon", cat: "backend" },
  { name: "Express", icon: "skill-icons:expressjs-dark", cat: "backend" },
  { name: "PHP", icon: "logos:php", cat: "backend" },
  { name: "Python", icon: "logos:python", cat: "backend" },
  { name: "Java", icon: "logos:java", cat: "backend" },
  { name: "C++", icon: "logos:c-plusplus", cat: "backend" },
  { name: "C", icon: "logos:c", cat: "backend" },
  { name: "Supabase", icon: "logos:supabase-icon", cat: "data" },
  { name: "Firebase", icon: "logos:firebase", cat: "data" },
  { name: "MongoDB", icon: "logos:mongodb-icon", cat: "data" },
  { name: "Pinecone", icon: "simple-icons:pinecone", cat: "data" },
  { name: "Convex", icon: "simple-icons:convex", cat: "data" },
];

// Split into two rows — interleaved so rows feel distinct
const ROW_A = SKILLS.filter((_, i) => i % 2 === 0);   // 10 items
const ROW_B = SKILLS.filter((_, i) => i % 2 !== 0);   // 10 items

// ─── Separator dot ───────────────────────────────────────────────────────────
const Sep = () => (
  <span
    aria-hidden
    className="inline-block w-[3px] h-[3px] rounded-full bg-white/20 flex-shrink-0 mx-1"
  />
);

// ─── Single marquee row ───────────────────────────────────────────────────────
/**
 * Pure-CSS GPU marquee — zero JS RAF loop.
 * Duplicating the list once is enough; the animation runs continuously at 60 fps.
 * `paused` class is toggled on hover via CSS — no React state needed for pause.
 */
const MarqueeRow = ({ items, reverse = false, speed = 38, dim = false }) => {
  // We render the list twice; CSS animation translates exactly -50% so the
  // seam is invisible and there is zero overlap.
  const list = [...items, ...items];
  const duration = `${speed}s`;

  return (
    <div
      className={`marquee-row relative flex overflow-hidden select-none ${dim ? "opacity-40" : "opacity-100"
        }`}
      // Pause on hover for the whole row
      style={{ "--dur": duration }}
    >
      {/* fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black/80 to-transparent" />

      <div
        className={`marquee-track flex items-center gap-0 will-change-transform ${reverse ? "marquee-reverse" : "marquee-forward"
          }`}
        aria-hidden
      >
        {list.map((skill, idx) => (
          <SkillPill key={`${skill.name}-${idx}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

// ─── Skill pill ───────────────────────────────────────────────────────────────
const SkillPill = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="inline-flex items-center gap-4 px-8 py-4 mx-4 flex-shrink-0 group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* icon */}
      <span
        className="inline-flex items-center justify-center w-[32px] h-[32px] lg:w-[42px] lg:h-[42px] flex-shrink-0 transition-all duration-500"
        style={{
          filter: hovered ? "none" : "grayscale(0.5) brightness(0.9)",
          transform: hovered ? "scale(1.2) rotate(5deg)" : "scale(1)",
        }}
      >
        <Icon icon={skill.icon} style={{ width: "100%", height: "100%" }} />
      </span>

      {/* label */}
      <span
        className="text-[18px] lg:text-[24px] font-medium tracking-tight transition-all duration-300 whitespace-nowrap"
        style={{ 
          color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
          textShadow: hovered ? "0 0 20px rgba(255,255,255,0.3)" : "none"
        }}
      >
        {skill.name}
      </span>

      <Sep />
    </span>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const Skills = () => {
  return (
    <section className="skills-section relative py-32 bg-transparent overflow-hidden">

      {/* ── heading ── */}
      <div className="text-center mb-20 px-6">
        {/* eyebrow */}
        <p className="text-[12px] text-white/40 font-mono uppercase tracking-[0.5em] mb-6">
          Core Stack &amp; Technologies
        </p>

        {/* main title */}
        <h2
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-tight text-white uppercase"
          style={{ fontWeight: 100, letterSpacing: "-0.04em" }}
        >
          Dev{" "}
          <span
            className="relative inline-block font-bold text-white"
          >
            Stacks
            {/* underline accent */}
            <span
              aria-hidden
              className="absolute left-0 -bottom-4 w-full h-1 bg-white/10 overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </span>
          </span>
        </h2>

        {/* skill count */}
        <p className="mt-8 text-[12px] text-white/30 font-mono tracking-[0.35em] uppercase">
          {SKILLS.length} powerful technologies in my arsenal
        </p>
      </div>

      {/* ── marquee rows ── */}
      <div className="flex flex-col gap-8 py-6">
        <MarqueeRow items={ROW_A} reverse={false} speed={45} />
        <MarqueeRow items={ROW_B} reverse={true} speed={40} />
      </div>

      {/* ── category legend ── */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-14 px-6">
        {[
          { label: "Frontend", col: "rgba(255,255,255,0.7)" },
          { label: "Backend / Lang", col: "rgba(255,255,255,0.45)" },
          { label: "Data / DB", col: "rgba(255,255,255,0.25)" },
        ].map(({ label, col }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: col }}
            />
            <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── CSS keyframes & marquee mechanics ── */}
      <style>{`
        /* forward: slides left by exactly 50% (one copy's width) */
        @keyframes marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* reverse: slides right by exactly 50% */
        @keyframes marquee-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }

        .marquee-forward {
          animation: marquee-fwd var(--dur, 38s) linear infinite;
        }
        .marquee-reverse {
          animation: marquee-rev var(--dur, 34s) linear infinite;
        }

        /* Pause on row hover — no JS needed */
        .marquee-row:hover .marquee-forward,
        .marquee-row:hover .marquee-reverse {
          animation-play-state: paused;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-forward,
          .marquee-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;