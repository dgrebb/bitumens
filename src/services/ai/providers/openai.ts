import OpenAI from "openai";
import type { AIProvider, AIMessage, AIResponse } from "../../../types/ai";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  id = "openai";
  name = "OpenAI";
  features = {
    streaming: true,
    functionCalling: true,
    imageGeneration: true,
  };

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Note: Only for prototyping
    });
  }

  async createCompletion(messages: AIMessage[]): Promise<AIResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      });

      return {
        content: completion.choices[0].message.content || "",
        metadata: {
          model: completion.model,
          usage: completion.usage,
        },
      };
    } catch (error) {
      console.error("OpenAI Error:", error);
      throw error;
    }
  }
}
