
import { useState, useRef, useEffect } from "react";
import { Send, X, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

interface ChatUIProps {
  onClose?: () => void;
}

const ChatUI = ({ onClose }: ChatUIProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm Tomer's AI assistant for this portfolio. Ask me anything about Tomer's experience, skills, projects, or resume!",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [includeChat, setIncludeChat] = useState(true);
  const [message, setMessage] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

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

  const handleExportChat = () => {
    // Generate the chat transcript
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please provide an email address to export the chat.",
        variant: "destructive"
      });
      return;
    }

    let emailBody = message + "\n\n";

    if (includeChat) {
      emailBody += "--- Chat Transcript ---\n\n";
      messages.forEach(msg => {
        const time = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        emailBody += `[${time}] ${msg.role === 'assistant' ? 'Tomer AI' : 'You'}: ${msg.content}\n\n`;
      });
    }

    // Simulate the email sending
    toast({
      title: "Chat Exported",
      description: `Your chat has been sent to ${email}`,
    });
    
    setExportDialogOpen(false);
  };

  return (
    <div className="relative flex flex-col h-[500px] max-h-[70vh] bg-background rounded-lg overflow-hidden border border-border glass-card">
      <div className="p-4 bg-secondary/30 backdrop-blur-md border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-primary">Chat with Tomer's AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Ask about my experience, skills, projects, or resume</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setExportDialogOpen(true)}
            className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Mail size={18} />
          </Button>
          {onClose && (
            <Button variant="outline" size="icon" onClick={onClose}>
              <X size={18} />
            </Button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto p-4 space-y-4">
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
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-secondary/20 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Tomer's experience, skills, projects..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </form>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Chat</DialogTitle>
            <DialogDescription>
              Send this conversation to your email address.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Input
                id="message"
                placeholder="Add a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="includeChat" 
                checked={includeChat} 
                onCheckedChange={(checked) => setIncludeChat(checked as boolean)}
              />
              <Label htmlFor="includeChat">Attach chat transcript</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportChat} className="ml-2">
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatUI;
