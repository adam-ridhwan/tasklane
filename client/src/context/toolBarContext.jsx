import { createContext, useState } from 'react';

export const ToolBarContext = createContext();

export const ToolBarProvider = ({ children }) => {
  const [activeCompletionTitle, setActiveCompletionTitle] = useState(2);
  const [activeRangeTitle, setActiveRangeTitle] = useState();

  return (
    <ToolBarContext.Provider
      value={{
        activeCompletionTitle,
        setActiveCompletionTitle,
        activeRangeTitle,
        setActiveRangeTitle,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
