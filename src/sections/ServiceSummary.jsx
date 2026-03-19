import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });
  return (
    <section className="relative mt-16 overflow-hidden font-light leading-snug text-center mb-32 contact-text-responsive">
      <div id="title-service-1">
        <p>Frontend Development</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 translate-x-16"
      >
        <p className="font-normal">React & Next.js</p>
        <div className="w-8 h-0.5 md:w-24 bg-gold" />
        <p>Animation</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 -translate-x-48"
      >
        <p>Full Stack</p>
        <div className="w-8 h-0.5 md:w-24 bg-gold" />
        <p>Modern Web Apps</p>
      </div>
      <div id="title-service-4" className="translate-x-48">
        <p>Performance & Quality</p>
      </div>
    </section>
  );
};

export default ServiceSummary;