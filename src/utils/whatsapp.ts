import { Client, LocalAuth } from 'whatsapp-web.js';

class WhatsAppClient {
  private static instance: WhatsAppClient;
  private client: Client;
  private isReady: boolean = false;

  private constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox']
      }
    });

    this.client.on('qr', (qr) => {
      // QR Code event - can be used to display QR for scanning
      console.log('QR RECEIVED', qr);
    });

    this.client.on('ready', () => {
      this.isReady = true;
      console.log('Client is ready!');
    });

    this.client.initialize();
  }

  public static getInstance(): WhatsAppClient {
    if (!WhatsAppClient.instance) {
      WhatsAppClient.instance = new WhatsAppClient();
    }
    return WhatsAppClient.instance;
  }

  public async sendMessage(phoneNumber: string, message: string): Promise<void> {
    if (!this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    try {
      // Format phone number
      const formattedNumber = phoneNumber.replace(/\D/g, '');
      const chatId = `${formattedNumber}@c.us`;

      await this.client.sendMessage(chatId, message);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  public async isConnected(): Promise<boolean> {
    return this.isReady;
  }
}

export const whatsAppClient = WhatsAppClient.getInstance();