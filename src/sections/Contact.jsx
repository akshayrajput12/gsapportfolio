import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Let's discuss your project requirements. Available for freelance opportunities and full-time positions.`;

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center min-h-screen"
    >
      <div className="relative z-10">
        <AnimatedHeaderSection
          subTitle={"Get In Touch"}
          title={"Contact"}
          text={text}
          textColor={"text-text"}
          withScrollTrigger={true}
        />
        <div className="flex px-10 font-light text-text uppercase lg:text-[28px] text-[22px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-text/30" />
              <p className="text-base tracking-wide lowercase md:text-lg lg:text-xl">
                akshayrajput2616@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-text/30" />
              <p className="text-base lowercase md:text-lg lg:text-xl">
                +91 9653814628
              </p>
            </div>
            <div className="social-link">
              <h2>Location</h2>
              <div className="w-full h-px my-2 bg-text/30" />
              <p className="text-base lowercase md:text-lg lg:text-xl">
                Jaipur, Rajasthan, India
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-text/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-text/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;