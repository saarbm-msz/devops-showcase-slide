
import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChatUI from "./Chat/ChatUI";

const Chat = () => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleChat = () => {
    setExpanded((prev) => !prev);
  };
  
  return (
    <section id="chat" className="section min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-primary">
            Chat with AI Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Have questions about my experience, skills, or projects? Chat with my AI assistant for immediate answers based on my portfolio and resume.
          </p>
          <Button 
            onClick={toggleChat}
            variant="outline" 
            className="flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-6"
            size="lg"
          >
            <MessageCircle size={18} />
            <span>{expanded ? "Hide Chat" : "Start Chatting"}</span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        
        <div 
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            expanded ? "max-h-[75vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {expanded && (
            <div className="animate-fade-in">
              <ChatUI />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chat;
