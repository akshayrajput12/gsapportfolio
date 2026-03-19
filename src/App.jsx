import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import GitHub from "./sections/GitHub";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import Works from "./sections/Works";
import Contact from "./sections/Contact";


const App = () => {
  return (
    <ReactLenis root className="relative w-screen min-h-screen">
      {/* All content sections - background shows through transparent sections */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <GitHub />
        <Services />
        <Works />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;