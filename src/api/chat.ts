
import { fetchAPI } from './config';

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

// Function to send user message to backend
export const sendMessage = async (messages: Message[], newMessage: string) => {
  try {
    console.log('Sending message to API:', { messages, newMessage });
    
    const response = await fetchAPI('/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        })),
        newMessage
      }),
    });
    
    return response;
  } catch (error) {
    console.error('Failed to send message:', error);
    
    // Fallback to simulated response if API fails
    return {
      id: Date.now().toString(),
      content: getSimulatedResponse(newMessage),
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };
  }
};

// Simulated response generator for fallback
const getSimulatedResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes("experience") || lowerQuery.includes("work")) {
    return "Tomer has over 8 years of experience in DevOps, working with companies like AWS, Google Cloud, and various startups to implement CI/CD pipelines, infrastructure as code, and Kubernetes deployments.";
  } else if (lowerQuery.includes("education") || lowerQuery.includes("study")) {
    return "Tomer has a Master's degree in Computer Science with a focus on distributed systems from Stanford University.";
  } else if (lowerQuery.includes("skill") || lowerQuery.includes("tech")) {
    return "Tomer's technical skills include: Kubernetes, Docker, Terraform, AWS, GCP, Azure, CI/CD (Jenkins, GitHub Actions, GitLab CI), Ansible, Prometheus, Grafana, ELK stack, and various programming languages like Python, Go, and Bash.";
  } else if (lowerQuery.includes("project")) {
    return "Tomer has led several significant projects, including a complete cloud migration for a Fortune 500 company, implementing a zero-downtime deployment system, and building an automated disaster recovery solution that reduced recovery time by 80%.";
  } else if (lowerQuery.includes("resume")) {
    return "You can download Tomer's full resume by clicking the 'Download Resume' button in the contact section. It includes detailed information about his work history, projects, and technical skills.";
  } else if (lowerQuery.includes("name") || lowerQuery.includes("who")) {
    return "My name is Tomer! I'm a DevOps Engineer with expertise in cloud infrastructure, automation, and CI/CD pipelines.";
  } else {
    return "Thanks for your question! As Tomer's AI assistant, I can tell you about his experience, skills, projects, education, or resume. Feel free to ask something specific!";
  }
};
