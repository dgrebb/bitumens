import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import IssuesList from './IssuesList';
import Chat from './Chat';
import AISettings from './AISettings';

const Workspace: React.FC = () => {
  const { currentType, currentMode } = useNavigation();

  if (currentMode === 'settings') {
    return <AISettings />;
  }

  if (currentMode === 'compose') {
    return (
      <div className="compose-workspace">
        <h2>AI Compose: {currentType}</h2>
        <Chat />
      </div>
    );
  }

  // Edit mode
  switch (currentType) {
    case 'issues':
      return <IssuesList />;
    case 'documents':
      return <div>Document Editor (Coming Soon)</div>;
    case 'requirements':
      return <div>Requirements Editor (Coming Soon)</div>;
    case 'tests':
      return <div>Test Editor (Coming Soon)</div>;
    default:
      return <div>Select an artifact type</div>;
  }
};

export default Workspace; 
