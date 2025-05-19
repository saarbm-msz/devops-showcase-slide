
import { ChatMessageInterface } from '@/types';
import { fetchAPI } from './config';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Send contact form data to backend
export const submitContactForm = async (formData: ContactFormData) => {
  try {
    console.log('Submitting contact form:', formData);
    
    const response = await fetchAPI('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    return response;
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    throw error;
  }
};

// Export chat transcript to email
export const exportChatToEmail = async (email: string, message: string, chatMessages: ChatMessageInterface[]) => {
  try {
    console.log('Exporting chat:', { email, message, includeTranscript: !!chatMessages });
    
    const response = await fetchAPI('/export-chat', {
      method: 'POST',
      body: JSON.stringify({
        email,
        message,
        chatMessages
      }),
    });
    
    return response;
  } catch (error) {
    console.error('Failed to export chat:', error);
    throw error;
  }
};
