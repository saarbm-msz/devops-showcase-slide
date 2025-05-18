
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm the AI assistant for this portfolio. Ask me anything about the DevOps Engineer's experience, skills, projects, or resume!",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response (this would be replaced with actual LLM API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getSimulatedResponse(input),
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // This is a placeholder function until the real LLM integration is set up
  const getSimulatedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("experience") || lowerQuery.includes("work")) {
      return "I have over 8 years of experience in DevOps, working with companies like AWS, Google Cloud, and various startups to implement CI/CD pipelines, infrastructure as code, and kubernetes deployments.";
    } else if (lowerQuery.includes("education") || lowerQuery.includes("study")) {
      return "I have a Master's degree in Computer Science with a focus on distributed systems from Stanford University.";
    } else if (lowerQuery.includes("skill") || lowerQuery.includes("tech")) {
      return "My technical skills include: Kubernetes, Docker, Terraform, AWS, GCP, Azure, CI/CD (Jenkins, GitHub Actions, GitLab CI), Ansible, Prometheus, Grafana, ELK stack, and various programming languages like Python, Go, and Bash.";
    } else if (lowerQuery.includes("project")) {
      return "I've led several significant projects, including a complete cloud migration for a Fortune 500 company, implementing a zero-downtime deployment system, and building an automated disaster recovery solution that reduced recovery time by 80%.";
    } else if (lowerQuery.includes("resume")) {
      return "You can download my full resume by clicking the 'Download Resume' button in the contact section. It includes detailed information about my work history, projects, and technical skills.";
    } else {
      return "Thanks for your question! As an AI representing this portfolio, I can tell you about the DevOps Engineer's experience, skills, projects, education, or resume. Feel free to ask something specific!";
    }
  };

  return (
    <div className="relative flex flex-col h-[600px] max-h-[70vh] bg-background rounded-lg overflow-hidden border border-border glass-card">
      <div className="p-4 bg-secondary/30 backdrop-blur-md border-b border-border">
        <h2 className="text-xl font-bold text-primary">Chat with AI Assistant</h2>
        <p className="text-sm text-muted-foreground">Ask about my experience, skills, projects, or resume</p>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-2 p-3 rounded-lg bg-secondary/20 max-w-[80%] animate-pulse">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-secondary/20 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my experience, skills, projects..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
