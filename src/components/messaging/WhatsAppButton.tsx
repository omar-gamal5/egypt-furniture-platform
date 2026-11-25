import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Button from '../ui/Button';
import { whatsAppClient } from '../../utils/whatsapp';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({ phoneNumber, message = '', className = '' }: WhatsAppButtonProps) {
  const [isSending, setIsSending] = useState(false);

  const handleClick = async () => {
    try {
      setIsSending(true);
      await whatsAppClient.sendMessage(phoneNumber, message || 'Hello! I found your profile on Furniture Hub.');
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      // Handle error appropriately
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      isLoading={isSending}
      className={className}
      variant="primary"
    >
      <MessageCircle size={16} className="mr-2" />
      WhatsApp
    </Button>
  );
}