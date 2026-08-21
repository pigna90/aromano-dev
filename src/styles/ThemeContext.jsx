import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes } from './theme';
import { ColorSchemeContext } from './colorScheme';

const STORAGE_KEY = 'colorScheme';

const getSystemMode = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const getStoredMode = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    // Private browsing or blocked storage: fall back to the system preference.
    return null;
  }
};

export const ThemeProvider = ({ children }) => {
  // `null` means "follow the system", which is the default until the user picks.
  const [override, setOverride] = useState(getStoredMode);
  const [systemMode, setSystemMode] = useState(getSystemMode);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setSystemMode(event.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const mode = override ?? systemMode;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.style.colorScheme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themes[mode].colors.bg);
  }, [mode]);

  const toggleMode = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setOverride(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just won't persist across reloads.
    }
  }, [mode]);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ColorSchemeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[mode]}>{children}</StyledThemeProvider>
    </ColorSchemeContext.Provider>
  );
};
