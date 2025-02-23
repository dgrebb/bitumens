import type { AIProvider, AIMessage, AIResponse } from "../../types/ai";
import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";

export class AIManager {
  private providers: Map<string, AIProvider> = new Map();
  private activeProviderId: string | null = null;

  constructor() {
    // Initialize providers from environment variables
    if (import.meta.env.VITE_OPENAI_API_KEY) {
      const openAIProvider = new OpenAIProvider(
        import.meta.env.VITE_OPENAI_API_KEY
      );
      this.registerProvider(openAIProvider);
      this.activeProviderId = openAIProvider.id; // Set OpenAI as default when available
    }

    if (import.meta.env.VITE_ANTHROPIC_API_KEY) {
      const anthropicProvider = new AnthropicProvider(
        import.meta.env.VITE_ANTHROPIC_API_KEY
      );
      this.registerProvider(anthropicProvider);
      if (!this.activeProviderId) {
        this.activeProviderId = anthropicProvider.id;
      }
    }
  }

  registerProvider(provider: AIProvider) {
    this.providers.set(provider.id, provider);
  }

  setActiveProvider(providerId: string) {
    if (!this.providers.has(providerId)) {
      throw new Error(`Provider ${providerId} not found`);
    }
    this.activeProviderId = providerId;
  }

  getActiveProvider(): AIProvider {
    if (!this.activeProviderId || !this.providers.has(this.activeProviderId)) {
      throw new Error(
        "No AI providers available. Please check your environment variables."
      );
    }
    return this.providers.get(this.activeProviderId)!;
  }

  getAvailableProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  async createCompletion(messages: AIMessage[]): Promise<AIResponse> {
    const provider = this.getActiveProvider();
    return provider.createCompletion(messages);
  }
}
