import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";

const Services = () => {
  const text = `High-end development services tailored for brands that demand excellence in performance, design, and scalability.`;
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Basic entrance animation for each service block
    const blocksSource = gsap.utils.toArray(".service-block");
    blocksSource.forEach((block) => {
      gsap.from(block.querySelectorAll(".stagger-item"), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section id="services" className="relative py-32 bg-transparent" ref={containerRef}>
      <AnimatedHeaderSection
        subTitle={"Expertise"}
        title={"Our Services"}
        text={text}
        textColor={"text-text"}
        withScrollTrigger={true}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 space-y-32">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            className="service-block relative"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              
              {/* Sticky Meta Column (Desktop Only) */}
              <div className="lg:w-1/3 lg:sticky lg:top-32 lg:h-fit space-y-8">
                <div className="flex items-center gap-4 text-gold font-mono text-xs tracking-[0.4em] uppercase stagger-item">
                  <span>Service // 0{index + 1}</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-text stagger-item leading-tight">
                  {service.title}
                </h2>
                
                <p className="text-xl lg:text-2xl text-text/80 leading-relaxed stagger-item font-light max-w-sm">
                  {service.description}
                </p>
                
                {/* Visual Accent */}
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-gold/30 to-transparent stagger-item" />
              </div>

              {/* Scrolling Content Column */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {service.items.map((item, itemIndex) => (
                  <motion.div 
                    key={itemIndex}
                    className="stagger-item group cursor-pointer relative"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    {/* Hover Decoration */}
                    <motion.div 
                      className="absolute -left-4 top-0 w-[2px] h-full bg-gold origin-top"
                      variants={{
                        rest: { scaleY: 0, opacity: 0 },
                        hover: { scaleY: 1, opacity: 1 }
                      }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-medium text-text/90 group-hover:text-gold transition-colors duration-500">
                          {item.title}
                        </h3>
                        <span className="text-sm font-mono text-text/30 group-hover:text-gold transition-all duration-500 transform group-hover:translate-x-2">
                          →
                        </span>
                      </div>
                      
                      <p className="text-lg text-text/60 leading-relaxed font-light group-hover:text-text/90 transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Line Border */}
                    <div className="mt-8 w-full h-[1px] bg-text/5 group-hover:bg-gold/10 transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Background Details */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-text/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-text/5 to-transparent" />
      </div>
    </section>
  );
};

export default Services;