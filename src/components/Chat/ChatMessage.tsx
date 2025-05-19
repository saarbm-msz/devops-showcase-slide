import { cn } from "@/lib/utils";
type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};
interface ChatMessageProps {
  message: Message;
}
const ChatMessage = ({
  message
}: ChatMessageProps) => {
  const isUser = message.role === 'user';
  return <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] rounded-lg p-4", isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary text-secondary-foreground mr-auto")}>
        <div className="prose dark:prose-invert">
          <p className="m-0 text-sm whitespace-pre-wrap text-left">{message.content}</p>
        </div>
        <div className={cn("text-xs mt-2", isUser ? "text-primary-foreground/80" : "text-muted-foreground")}>
          {message.timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
        </div>
      </div>
    </div>;
};
export default ChatMessage;