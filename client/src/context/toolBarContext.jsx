import { createContext, useState } from 'react';

export const ToolBarContext = createContext();
const COMPLETION_TITLES = ['Incomplete tasks', 'Completed tasks', 'All tasks'];
const RANGE_TITLES = [
  'All completed tasks',
  'Today',
  'Yesterday',
  '1 week',
  '2 weeks',
  '3 weeks',
];

export const ToolBarProvider = ({ children }) => {
  const [activeOption, setActiveOption] = useState(2);
  const [activeRange, setActiveRange] = useState();

  return (
    <ToolBarContext.Provider
      value={{
        activeOption,
        setActiveOption,
        activeRange,
        setActiveRange,
        COMPLETION_TITLES,
        RANGE_TITLES,
      }}
    >
      {children}
    </ToolBarContext.Provider>
  );
};
