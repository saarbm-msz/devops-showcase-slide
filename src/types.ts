export interface ChatMessageInterface {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};