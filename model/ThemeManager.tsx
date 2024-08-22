import React, {createContext, useState, useContext, ReactNode} from 'react';
import { CardManagerContext } from "./CardManager.tsx";

interface ThemeManagerContextType {
  isDarkMode: boolean;
  opacity: number;
  toggleTheme: () => void;
  changeOpacity: (newValue: React.SetStateAction<number>) => void;
}

export const ThemeManagerContext = createContext<
  ThemeManagerContextType | undefined
>(undefined);

export const useTheme = () => useContext(ThemeManagerContext);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [opacity, setOpacity] = useState(0.5);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const changeOpacity = (newValue: React.SetStateAction<number>) => {
    setOpacity(newValue);
  };

  return (
    <ThemeManagerContext.Provider
      value={{isDarkMode, opacity, toggleTheme, changeOpacity}}>
      {children}
    </ThemeManagerContext.Provider>
  );
};

export const useThemeManager = () => {
  const context = useContext(ThemeManagerContext);
  if (!context) {
    throw new Error(
      'useThemeManager must be used within a ThemeManagerProvider',
    );
  }
  return context;
};
