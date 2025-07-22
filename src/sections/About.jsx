import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Experienced Full Stack Developer with expertise in modern web technologies.
    I architect and build enterprise-grade applications using React, Node.js,
    and cloud infrastructure to deliver measurable business results.`;
  const aboutText = `With over 5 years of experience in full stack development, I specialize in creating robust, scalable web applications using cutting-edge technologies. My expertise spans across:

🚀 Frontend Development: React.js, Vue.js, TypeScript, responsive design
⚙️ Backend Engineering: Node.js, Express, RESTful APIs, GraphQL, microservices
☁️ Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD pipelines, serverless architecture
🗄️ Database Management: MongoDB, PostgreSQL, Redis, database optimization

I'm passionate about writing clean, maintainable code and implementing best practices that ensure long-term project success. My approach combines technical excellence with business understanding to deliver solutions that not only work flawlessly but also drive growth and user engagement.
  When I’m not shipping:
⚡️ Open-sourcing my latest experiment (or hacking on yours)
🎥 improving devs on Github because rising tides lift all ships
🧗 Rock climbing (problem-solving with real stakes)
🎸 Strumming chords while CI pipelines pass (multitasking at its finest)`;
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
          src="images/harshit-ai.jpg"
          alt="Harshit Vaidya"
          className="w-md rounded-3xl border-2 border-neutral-700/35"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;