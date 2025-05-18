
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 section">
          <div className="glass-card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-4">
              With over 5 years of experience as a DevOps Engineer, I've helped companies 
              streamline their development workflows, implement CI/CD pipelines, and manage 
              complex cloud infrastructures.
            </p>
            <p className="text-muted-foreground mb-4">
              My passion lies in automating everything possible, ensuring that development teams 
              can focus on building great products while I handle the infrastructure and deployment 
              processes.
            </p>
            <p className="text-muted-foreground">
              I consider myself a lifelong learner, constantly exploring new technologies and methodologies 
              to improve the development lifecycle and system reliability.
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="glass-card p-6 md:p-8 flex-1">
              <h3 className="text-2xl font-bold mb-6">What I Do</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Design and implement CI/CD pipelines</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Manage cloud infrastructure (AWS, GCP, Azure)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Container orchestration with Kubernetes</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Infrastructure as Code (Terraform, CloudFormation)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Monitoring and observability solutions</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 md:p-8 flex-1">
              <h3 className="text-2xl font-bold mb-6">Personal Interests</h3>
              <p className="text-muted-foreground">
                When I'm not optimizing infrastructure, you'll find me hiking in nature, 
                contributing to open-source projects, and experimenting with home automation. 
                I believe in continuous learning and sharing knowledge with the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
