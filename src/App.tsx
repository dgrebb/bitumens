import React from 'react';
import { IssuesProvider } from './context/IssuesContext';
import { ChatProvider } from './context/ChatContext';
import { NavigationProvider } from './context/NavigationContext';
import Navigation from './components/Navigation';
import Workspace from './components/Workspace';
import './App.css';

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <ChatProvider>
        <IssuesProvider>
          <div className="app">
            <h1>Project Artifacts</h1>
            <Navigation />
            <Workspace />
          </div>
        </IssuesProvider>
      </ChatProvider>
    </NavigationProvider>
  );
};

export default App;
