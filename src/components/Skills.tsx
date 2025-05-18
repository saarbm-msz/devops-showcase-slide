
import { useRef, useEffect, useState } from 'react';

interface SkillProps {
  name: string;
  level: number;
  color?: string;
}

const Skill = ({ name, level, color = "bg-primary" }: SkillProps) => {
  const skillRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, []);

  return (
    <div ref={skillRef} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

interface ToolBadgeProps {
  name: string;
}

const ToolBadge = ({ name }: ToolBadgeProps) => {
  return (
    <div className="bg-secondary px-4 py-2 rounded-full text-sm inline-flex items-center justify-center">
      {name}
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const devopsSkills = [
    { name: "CI/CD Pipeline Design", level: 95 },
    { name: "Kubernetes", level: 90 },
    { name: "Docker", level: 92 },
    { name: "Terraform", level: 88 },
    { name: "AWS", level: 90 },
    { name: "Monitoring & Alerting", level: 85 },
  ];

  const programmingSkills = [
    { name: "Python", level: 85 },
    { name: "Bash/Shell", level: 90 },
    { name: "Go", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "YAML/JSON", level: 95 },
    { name: "Git", level: 88 },
  ];

  const tools = [
    "Jenkins", "GitHub Actions", "CircleCI", "ArgoCD", "Prometheus", 
    "Grafana", "ELK Stack", "Ansible", "Helm", "GitLab CI", "Datadog",
    "New Relic", "CloudFormation", "Pulumi", "Istio", "Vault"
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div ref={sectionRef} className="section">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">DevOps & Cloud</h3>
              <div>
                {devopsSkills.map((skill, index) => (
                  <Skill key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>

            <div className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">Programming</h3>
              <div>
                {programmingSkills.map((skill, index) => (
                  <Skill key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 glass-card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <ToolBadge key={index} name={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
