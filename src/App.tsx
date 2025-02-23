import React from 'react';
import { IssuesProvider } from './context/IssuesContext';
import IssuesList from './components/IssuesList';
import './App.css';

const App: React.FC = () => {
  return (
    <IssuesProvider>
      <div className="app">
        <h1>Project Artifacts</h1>
        <IssuesList />
      </div>
    </IssuesProvider>
  );
};

export default App;
