import React, { createContext, useContext, useState } from 'react';
import type { ArtifactType, ArtifactMode, NavigationState } from '../types/artifacts';

interface NavigationContextType extends NavigationState {
  setCurrentType: (type: ArtifactType) => void;
  setCurrentMode: (mode: ArtifactMode) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentType: 'issues',
  currentMode: 'edit',
  setCurrentType: () => {},
  setCurrentMode: () => {},
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentType, setCurrentType] = useState<ArtifactType>('issues');
  const [currentMode, setCurrentMode] = useState<ArtifactMode>('edit');

  return (
    <NavigationContext.Provider value={{
      currentType,
      currentMode,
      setCurrentType,
      setCurrentMode,
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext); 
