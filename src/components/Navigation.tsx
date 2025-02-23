import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import type { ArtifactType, ArtifactMode } from '../types/artifacts';

const artifactTypes: { id: ArtifactType; label: string }[] = [
  { id: 'issues', label: 'Issues' },
  { id: 'documents', label: 'Documents' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'tests', label: 'Tests' },
];

const modes: { id: ArtifactMode; label: string }[] = [
  { id: 'compose', label: 'AI Compose' },
  { id: 'edit', label: 'Manual Edit' },
];

const Navigation: React.FC = () => {
  const { currentType, currentMode, setCurrentType, setCurrentMode } = useNavigation();

  return (
    <nav className="navigation">
      <div className="nav-sections">
        <div className="nav-section">
          <label>Artifact Type:</label>
          <div className="button-group">
            {artifactTypes.map(type => (
              <button
                key={type.id}
                className={currentType === type.id ? 'active' : ''}
                onClick={() => setCurrentType(type.id)}
                disabled={currentMode === 'settings'}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="nav-section">
          <label>Mode:</label>
          <div className="button-group">
            {modes.map(mode => (
              <button
                key={mode.id}
                className={currentMode === mode.id ? 'active' : ''}
                onClick={() => setCurrentMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        className={`settings-button ${currentMode === 'settings' ? 'active' : ''}`}
        onClick={() => setCurrentMode(currentMode === 'settings' ? 'edit' : 'settings')}
      >
        ⚙️ Settings
      </button>
    </nav>
  );
};

export default Navigation; 
