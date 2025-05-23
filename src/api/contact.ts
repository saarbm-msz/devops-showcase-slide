
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
export const exportChatToEmail = async (email: string, message: string, chatTranscript: string | null) => {
  try {
    console.log('Exporting chat:', { email, message, includeTranscript: !!chatTranscript });
    
    const response = await fetchAPI('/export-chat', {
      method: 'POST',
      body: JSON.stringify({
        email,
        message,
        chatTranscript
      }),
    });
    
    return response;
  } catch (error) {
    console.error('Failed to export chat:', error);
    throw error;
  }
};
