import React, { useContext, useState } from "react";
import { IssuesContext } from "../context/IssuesContext";
import IssueForm from "./IssueForm";
import type { Issue } from '../@types';

const IssuesList: React.FC = () => {
  const { issues } = useContext(IssuesContext);
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedIssue(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="issues-container">
      <div className="issues-header">
        <h2>Issues</h2>
        <button onClick={handleAddNew}>Add New Issue</button>
      </div>

      {isFormOpen && (
        <IssueForm
          selectedIssue={selectedIssue}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <h3>{issue.title}</h3>
            <p>{issue.summary}</p>
            <p>{issue.description}</p>
            <button onClick={() => handleEditClick(issue)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesList;
