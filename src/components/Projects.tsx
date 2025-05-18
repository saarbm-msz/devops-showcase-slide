
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  type: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Cloud-Native CI/CD Platform",
    description: "Designed and implemented a cloud-native CI/CD platform using Kubernetes, Tekton, and ArgoCD, reducing deployment time by 70% and improving reliability.",
    technologies: ["Kubernetes", "Tekton", "ArgoCD", "Go", "AWS"],
    type: "Enterprise",
    link: "#"
  },
  {
    id: 2,
    title: "Infrastructure as Code Framework",
    description: "Created a comprehensive IaC framework using Terraform modules and GitOps principles, enabling teams to spin up production-grade environments in minutes.",
    technologies: ["Terraform", "AWS", "GitHub Actions", "Python", "Docker"],
    type: "Enterprise",
    link: "#"
  },
  {
    id: 3,
    title: "Observability Platform",
    description: "Built a unified observability platform combining metrics, logs, and traces using Prometheus, Loki, and Tempo, improving incident response time by 60%.",
    technologies: ["Prometheus", "Grafana", "Loki", "Tempo", "Kubernetes"],
    type: "Enterprise",
    link: "#"
  },
  {
    id: 4,
    title: "Serverless ETL Pipeline",
    description: "Designed and implemented a serverless ETL pipeline processing 10TB+ of data daily using AWS Lambda, Step Functions, and S3.",
    technologies: ["AWS Lambda", "Step Functions", "S3", "Python", "DynamoDB"],
    type: "Data Engineering",
    link: "#"
  },
  {
    id: 5,
    title: "Multi-Cloud Disaster Recovery",
    description: "Implemented a robust DR solution spanning AWS and GCP with automated failover capabilities and 99.99% availability SLA.",
    technologies: ["AWS", "GCP", "Terraform", "Python", "Kubernetes"],
    type: "Infrastructure",
    link: "#"
  },
  {
    id: 6,
    title: "Secret Management System",
    description: "Deployed and customized HashiCorp Vault with custom authentication methods and automated secret rotation across multiple environments.",
    technologies: ["Vault", "Kubernetes", "Go", "Terraform", "GitOps"],
    type: "Security",
    link: "#"
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="section glass-card p-6 md:p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50"
    >
      <div className="mb-2 text-xs text-primary font-medium">{project.type}</div>
      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
      <p className="text-muted-foreground mb-6 flex-1">{project.description}</p>
      
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-secondary text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        {project.link && (
          <a
            href={project.link}
            className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
          >
            View Details
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<string>("All");
  const [animating, setAnimating] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(projects);
  
  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      if (filter === "All") {
        setDisplayedProjects(projects);
      } else {
        setDisplayedProjects(projects.filter(project => project.type === filter));
      }
      setAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filter]);
  
  const filters = ["All", "Enterprise", "Infrastructure", "Security", "Data Engineering"];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filterName) => (
              <button
                key={filterName}
                onClick={() => setFilter(filterName)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  filterName === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>

        <div 
          className={cn(
            "grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300",
            animating ? "opacity-0" : "opacity-100"
          )}
        >
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
