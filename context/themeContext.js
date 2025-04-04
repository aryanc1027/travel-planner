import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get system color scheme
  const systemColorScheme = useColorScheme();
  
  // State to track if we're using system theme or manual override
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  
  // State to track the current theme
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  
  // Load saved preferences on app start
  useEffect(() => {
    const loadThemePreferences = async () => {
      try {
        const savedIsSystemTheme = await AsyncStorage.getItem('isSystemTheme');
        const savedIsDarkMode = await AsyncStorage.getItem('isDarkMode');
        
        if (savedIsSystemTheme !== null) {
          setIsSystemTheme(savedIsSystemTheme === 'true');
        }
        
        if (savedIsDarkMode !== null) {
          setIsDarkMode(savedIsDarkMode === 'true');
        }
      } catch (error) {
        console.error('Error loading theme preferences:', error);
      }
    };
    
    loadThemePreferences();
  }, []);
  
  // Update theme when system theme changes
  useEffect(() => {
    if (isSystemTheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, isSystemTheme]);
  
  // Toggle between dark and light mode
  const toggleDarkMode = async () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    setIsSystemTheme(false);
    
    try {
      await AsyncStorage.setItem('isDarkMode', newIsDarkMode.toString());
      await AsyncStorage.setItem('isSystemTheme', 'false');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  
  // Toggle between system theme and manual override
  const toggleSystemTheme = async () => {
    const newIsSystemTheme = !isSystemTheme;
    setIsSystemTheme(newIsSystemTheme);
    
    if (newIsSystemTheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
    
    try {
      await AsyncStorage.setItem('isSystemTheme', newIsSystemTheme.toString());
    } catch (error) {
      console.error('Error saving system theme preference:', error);
    }
  };
  
  // Get the current theme based on system or manual setting
  const getCurrentTheme = () => {
    return isDarkMode ? 'dark' : 'light';
  };
  
  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleDarkMode, 
        isSystemTheme, 
        toggleSystemTheme,
        getCurrentTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext); 