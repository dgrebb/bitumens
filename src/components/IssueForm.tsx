import React, { useState, useContext } from 'react';
import { IssuesContext } from '../context/IssuesContext';
import type { Issue } from '../@types';

interface IssueFormProps {
  selectedIssue?: Issue;
  onClose: () => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ selectedIssue, onClose }) => {
  const { updateIssue, setIssues } = useContext(IssuesContext);
  const [formData, setFormData] = useState<Omit<Issue, 'id'>>({
    title: selectedIssue?.title || '',
    summary: selectedIssue?.summary || '',
    description: selectedIssue?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIssue) {
      // Update existing issue
      updateIssue({
        id: selectedIssue.id,
        ...formData
      });
    } else {
      // Add new issue
      setIssues(currentIssues => [
        ...currentIssues,
        {
          id: Math.max(...currentIssues.map(issue => issue.id), 0) + 1,
          ...formData
        }
      ]);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="summary">Summary:</label>
        <input
          type="text"
          id="summary"
          value={formData.summary}
          onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {selectedIssue ? 'Update Issue' : 'Add Issue'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default IssueForm; 
