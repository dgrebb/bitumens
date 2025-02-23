import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AIMessage, AIProvider } from '../types/ai';
import { AIManager } from '../services/ai/AIManager';

interface ChatContextType {
  messages: AIMessage[];
  isLoading: boolean;
  error: Error | null;
  activeProvider: AIProvider;
  availableProviders: AIProvider[];
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  setProvider: (providerId: string) => void;
}

const DEFAULT_SYSTEM_PROMPT = `You are a helpful assistant that outputs markdown for Jira tasks. It will later be transformed into JSON by means of a markdown parser. There are four types of Jira issues that can be created, with optional parent/child relationships. Each Jira Issue type has a corresponding heading level in the markdown structure.

	Heading levels correspond to issue types as follows:
	- Features: H1 (#)
	- Epics: H2 (##)
	- User Stories: H3 (###)
	- Sub-Tasks: H4 (####)

	Important Rules:
	1. Hierarchy Rules:
	   - Sub-Tasks (H4) can ONLY be children of User Stories
	   - User Stories (H3) can be standalone or children of Epics
	   - Epics (H2) can be standalone or children of Features
	   - Features (H1) are always top-level

	2. For EACH issue type, ALWAYS include a detailed description after the heading:
	   - Features: Describe the overall feature and its business value
	   - Epics: Describe the epic's goals, scope, and expected outcomes
	   - User Stories: MUST follow format "As a [role], I want to [action] so that [benefit]" AND include acceptance criteria
	   - Sub-Tasks: MUST include detailed implementation steps or technical requirements

	3. Content Rules:
	   - Do NOT include issue type labels in summaries
	   - Keep summaries concise and clear
	   - Descriptions MUST be detailed and specific
	   - Sub-tasks MUST include technical implementation details
	   - Do NOT include any IDs or working IDs - these will be handled by Jira

	4. Start at the requested level:
	   - If user asks for User Stories, start with H3 (###)
	   - If user asks for Epics, start with H2 (##)
	   - If user asks for Features, start with H1 (#)
	   - Always include descriptions regardless of starting level

	Example of proper description format for each level:
	# Submit Button with Multiple States
	This feature implements a dynamic submit button that transitions between four states based on API interaction, improving user feedback during form submissions.

	## Button State Management
	This epic handles the implementation of state transitions and UI feedback mechanisms, ensuring consistent user experience across all form submissions.

	### Display Loading State During Submission
	As a user, I want to see a loading indicator when I submit a form so that I know my request is being processed.
	
	Acceptance Criteria:
	- Button shows spinner animation during API calls
	- Button is disabled during submission
	- Previous button state is preserved for retry scenarios

	#### Implement Loading State Animation
	Create a reusable loading spinner component using CSS animations. Include state management logic to track loading state and handle timeout scenarios. Ensure the component is accessible with proper ARIA attributes.`;

// Create context with a default value
const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [aiManager] = useState(() => new AIManager());
  const [activeProvider, setActiveProvider] = useState(() => aiManager.getActiveProvider());
  const [availableProviders, setAvailableProviders] = useState(() => aiManager.getAvailableProviders());

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: AIMessage = {
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    const messagesToSend = messages.length === 0 
      ? [
          { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
          userMessage
        ]
      : [...messages, userMessage];

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await aiManager.createCompletion(messagesToSend);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
        metadata: response.metadata,
      }]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [messages, aiManager]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const setProvider = useCallback((providerId: string) => {
    try {
      aiManager.setActiveProvider(providerId);
      setActiveProvider(aiManager.getActiveProvider());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to set provider'));
    }
  }, [aiManager]);

  const value = {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    activeProvider,
    availableProviders,
    setProvider,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 
