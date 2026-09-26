export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  whatsappLink?: string;
}

export type DemoRoute = '/' | '/la-montana' | '/lukoton-los-andes' | '/barberia-aconcagua';

export interface HardwareItem {
  id: string;
  name: string;
  subtitle: string;
  chip: string;
  material: string;
  durability: string;
  idealFor: string;
  imageAccent: string;
  tag: string;
  features: string[];
}
