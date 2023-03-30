import { createContext, useState } from 'react';

export const ToolBarContext = createContext();

export const ToolBarProvider = ({ children }) => {
  const [activeCompletionTitle, setActiveCompletionTitle] = useState(2);
  const [activeRangeTitle, setActiveRangeTitle] = useState();
  const [activeSortTitle, setActiveSortTitle] = useState(0);

  return (
    <ToolBarContext.Provider
      value={{
        activeCompletionTitle,
        setActiveCompletionTitle,
        activeRangeTitle,
        setActiveRangeTitle,
        activeSortTitle,
        setActiveSortTitle,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
