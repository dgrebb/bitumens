export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  metadata?: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  metadata?: Record<string, unknown>;
}

export interface AIProvider {
  id: string;
  name: string;
  createCompletion: (messages: AIMessage[]) => Promise<AIResponse>;
  maxTokens?: number;
  features?: {
    streaming?: boolean;
    functionCalling?: boolean;
    imageGeneration?: boolean;
  };
}
