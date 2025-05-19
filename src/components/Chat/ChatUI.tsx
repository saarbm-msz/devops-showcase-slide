
import { useState, useRef, useEffect } from "react";
import { Send, Download, Mail } from "lucide-react";
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
import { sendMessage } from "@/api/chat";
import { exportChatToEmail } from "@/api/contact";
import { ChatMessageInterface } from "@/types";



interface ChatUIProps {
  onClose?: () => void;
}

const ChatUI = ({ onClose }: ChatUIProps) => {
  const [messages, setMessages] = useState<ChatMessageInterface[]>([
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

    const userMessage: ChatMessageInterface = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to API
      const response = await sendMessage(messages, input);

      // Create AI message from response
      const aiMessage: ChatMessageInterface = {
        id: response.id || (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date(response.timestamp) || new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportChat = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please provide an email address to export the chat.",
        variant: "destructive"
      });
      return;
    }

    let chatTranscript = null;

    try {
      await exportChatToEmail(email, message, messages);

      toast({
        title: "Chat Exported",
        description: `Your chat has been sent to ${email}`,
      });

      setExportDialogOpen(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export the chat. Please try again.",
        variant: "destructive"
      });
    }
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
