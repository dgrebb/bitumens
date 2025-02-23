import type { AIProvider, AIMessage, AIResponse } from "../../../types/ai";

export class AnthropicProvider implements AIProvider {
  id = "anthropic";
  name = "Anthropic Claude";
  features = {
    streaming: true,
    functionCalling: true,
  };

  constructor(private apiKey: string) {}

  async createCompletion(messages: AIMessage[]): Promise<AIResponse> {
    // Implement Anthropic API calls here
    throw new Error("Anthropic implementation pending");
  }
}
