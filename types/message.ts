// types/message.ts

  
export type Sender = 'user' | 'assistant';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
}