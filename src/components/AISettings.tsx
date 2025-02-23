import React from 'react';
import { useChat } from '../context/ChatContext';

const AISettings: React.FC = () => {
  const { availableProviders, activeProvider, setProvider } = useChat();

  return (
    <div className="ai-settings">
      <h2>AI Provider Settings</h2>
      <div className="provider-list">
        {availableProviders.map(provider => (
          <div key={provider.id} className={`provider-card ${provider.id === activeProvider.id ? 'active' : ''}`}>
            <div className="provider-header">
              <h3>{provider.name}</h3>
              <button 
                onClick={() => setProvider(provider.id)}
                disabled={provider.id === activeProvider.id}
              >
                {provider.id === activeProvider.id ? 'Active' : 'Switch to'}
              </button>
            </div>
            <div className="provider-features">
              <h4>Available Features:</h4>
              <ul>
                {Object.entries(provider.features || {}).map(([feature, enabled]) => (
                  <li key={feature} className={enabled ? 'enabled' : 'disabled'}>
                    {feature}: {enabled ? '✓' : '✗'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="settings-info">
        <p>Note: API keys are managed through environment variables.</p>
        <code>VITE_OPENAI_API_KEY=your_key_here</code><br />
        <code>VITE_ANTHROPIC_API_KEY=your_key_here</code>
      </div>
    </div>
  );
};

export default AISettings; 
