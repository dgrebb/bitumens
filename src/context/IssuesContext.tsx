import React, { useState, createContext } from 'react';
import type { Issue } from '../@types';

// Define the context type
interface IssuesContextType {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  updateIssue: (updatedIssue: Issue) => void;
}

// Create the context
export const IssuesContext = createContext<IssuesContextType>({
  issues: [],
  setIssues: () => {},
  updateIssue: () => {},
});

// Dummy data for testing
const dummyIssues: Issue[] = [
  {
    id: 1,
    title: "Implement User Authentication",
    summary: "Set up JWT-based authentication system for users"
  },
  {
    id: 2,
    title: "Create Dashboard Layout",
    summary: "Design and implement main dashboard layout with sidebar"
  }
];

export const IssuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(dummyIssues);

  const updateIssue = (updatedIssue: Issue) => {
    setIssues(currentIssues => 
      currentIssues.map(issue => 
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
  };

  return (
    <IssuesContext.Provider value={{ issues, setIssues, updateIssue }}>
      {children}
    </IssuesContext.Provider>
  );
};
