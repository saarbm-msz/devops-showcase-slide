
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChatButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setIsAnimating(prev => !prev);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  
  const handleChatClick = () => {
    navigate('/chat');
  };
  
  if (!isVisible) return null;
  
  return (
    <Button 
      onClick={handleChatClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50",
        "flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        isAnimating && "animate-bounce"
      )}
      size="lg"
    >
      <MessageCircle size={24} />
    </Button>
  );
};

export default ChatButton;
