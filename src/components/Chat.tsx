import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const Chat: React.FC = () => {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    activeProvider,
    availableProviders,
    setProvider,
  } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <select
          value={activeProvider.id}
          onChange={(e) => setProvider(e.target.value)}
          disabled={isLoading}
        >
          {availableProviders.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            {message.metadata && (
              <div className="message-metadata">
                {new Date(message.timestamp!).toLocaleTimeString()}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="message loading">Thinking...</div>}
        {error && <div className="error">{error.message}</div>}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
        <button type="button" onClick={clearChat} disabled={isLoading}>
          Clear Chat
        </button>
      </form>
    </div>
  );
};

export default Chat; 
