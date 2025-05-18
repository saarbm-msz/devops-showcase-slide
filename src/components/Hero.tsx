
import { useEffect, useRef } from "react";

const Hero = () => {
  const textContainers = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll(".reveal-text");
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.classList.add("revealed");
            }, index * 100);
          });
        }
      });
    }, options);

    textContainers.current.forEach((container) => {
      if (container) observer.observe(container);
    });

    return () => {
      textContainers.current.forEach((container) => {
        if (container) observer.unobserve(container);
      });
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background opacity-90"></div>
      </div>
      
      <div className="container mx-auto relative z-10 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <span 
            ref={(el) => (textContainers.current[0] = el)} 
            className="reveal-container block mb-3"
          >
            <span className="text-primary text-lg font-medium reveal-text">Hello, I'm a</span>
          </span>
          
          <div className="mb-6">
            <span 
              ref={(el) => (textContainers.current[1] = el)}
              className="reveal-container block"
            >
              <h1 className="text-5xl md:text-7xl font-bold reveal-text">
                DevOps Engineer
              </h1>
            </span>
          </div>
          
          <span 
            ref={(el) => (textContainers.current[2] = el)}
            className="reveal-container block mb-8"
          >
            <p className="text-xl text-muted-foreground reveal-text">
              Automating workflows, optimizing infrastructure, and delivering seamless deployments
            </p>
          </span>
          
          <span 
            ref={(el) => (textContainers.current[3] = el)}
            className="reveal-container inline-block"
          >
            <a 
              href="#projects"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium reveal-text hover:bg-primary/90 transition-colors"
            >
              View My Work
            </a>
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
