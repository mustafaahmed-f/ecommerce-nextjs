export interface MessagePart {
  text: string;
}

export type MessageRole = "user" | "model";

export interface Message {
  role: MessageRole;
  parts: MessagePart[];
}

export interface ChatHistory extends Array<Message> {}

export interface ChatSettings {
  temperature: number;
  model: string;
  systemInstruction: string;
}

export interface GenerationSettings {
  temperature: number;
  topP: number;
  responseMimeType: string;
}
