import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import About from "./sections/About";
import ReactLenis from "lenis/react";
import { useProgress } from "@react-three/drei";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";

// Create a new Experience component
const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Freelance Full-Stack Developer",
      company: "Freelancer",
      period: "Jan 2024 - Present",
      location: "Remote",
      description: "Delivered websites and full-stack web applications for startups and offline market companies transitioning online.",
      technologies: ["React.js", "Next.js", "TypeScript", "Framer Motion", "GSAP", "Supabase", "Firebase"]
    },
    {
      id: 2,
      role: "Junior Full-Stack Developer",
      company: "Sheetsway.com (AI Audit Platform)",
      period: "Dec 2024 - March 2025",
      location: "Remote",
      description: "Built full-stack software from scratch for clients using React.js, Supabase, Tailwind, Framer Motion. Helped integrate payments on the platform and built Sheetsway website UI from scratch.",
      technologies: ["React.js", "Supabase", "Tailwind CSS", "Framer Motion"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen bg-white rounded-t-4xl py-20">
      <div className="px-10">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-light tracking-widest text-black/50">MY JOURNEY</h2>
          <h1 className="text-5xl font-bold text-black mt-2">Experience</h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 border-l-2 border-gold/30 group">
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-gold border-4 border-black"></div>
              <div className="ml-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                  <span className="text-lg text-gold">{exp.period}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <h4 className="text-xl text-black/80">{exp.company}</h4>
                  <span className="text-black/50">•</span>
                  <span className="text-black/70">{exp.location}</span>
                </div>
                <p className="mt-4 text-lg text-black/60">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1 text-sm text-white bg-black rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Create a new Education component
const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "Bachelor's in Computer Science",
      institution: "Lovely Professional University",
      location: "Punjab, India",
      period: "2022 - 2027",
      description: "Pursuing a Bachelor's degree in Computer Science with a focus on software development, algorithms, and modern web technologies."
    }
  ];

  return (
    <section id="education" className="min-h-screen bg-black py-20">
      <div className="px-10">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-light tracking-widest text-white/50">ACADEMIC BACKGROUND</h2>
          <h1 className="text-5xl font-bold text-white mt-2">Education</h1>
          <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {educationData.map((edu) => (
            <div key={edu.id} className="p-8 bg-black border border-white/10 rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                <span className="px-4 py-1 text-lg text-white bg-gold/50 rounded-full">{edu.period}</span>
              </div>
              <h4 className="text-xl text-gold">{edu.institution}</h4>
              <p className="mt-2 text-white/70">{edu.location}</p>
              <p className="mt-4 text-lg text-white/60">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-screen min-h-screen">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Experience />
        <Education />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;