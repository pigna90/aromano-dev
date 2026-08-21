import { createContext, useContext } from 'react';

/**
 * Lives apart from ThemeContext.jsx so that file only exports a component,
 * which keeps Vite's fast refresh working.
 */
export const ColorSchemeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
});

export const useColorScheme = () => useContext(ColorSchemeContext);
