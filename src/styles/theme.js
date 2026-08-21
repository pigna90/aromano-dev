/**
 * Design tokens.
 *
 * Every colour, font, radius and spacing step in the site comes from here.
 * Components should never hardcode a hex value — reach for `theme.colors.*`
 * so light and dark stay in sync.
 */

const fonts = {
  display: "'Instrument Serif', 'Iowan Old Style', Georgia, 'Times New Roman', serif",
  body: "'Inter Variable', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, monospace",
};

const radii = {
  sm: '4px',
  md: '8px',
  lg: '14px',
  xl: '20px',
  pill: '999px',
};

const layout = {
  maxWidth: '1120px',
  readWidth: '760px',
  gutter: '1.5rem',
  gutterMobile: '1.25rem',
};

const motionTokens = {
  fast: '160ms cubic-bezier(0.2, 0, 0, 1)',
  base: '260ms cubic-bezier(0.2, 0, 0, 1)',
  slow: '420ms cubic-bezier(0.2, 0, 0, 1)',
};

const shared = { fonts, radii, layout, motion: motionTokens };

export const lightTheme = {
  ...shared,
  name: 'light',
  colors: {
    // Surfaces — warm paper, not clinical white
    bg: '#FDFCFA',
    bgAlt: '#F6F4EF',
    surface: '#FFFFFF',
    surfaceSunken: '#F1EEE8',

    // Text — checked against `bg` for WCAG AA
    ink: '#14181C',
    inkSecondary: '#39424B',
    inkMuted: '#626C77',

    // Lines
    hairline: '#E5E1D9',
    hairlineStrong: '#D2CCC1',

    // Primary accent
    accent: '#5B4BE1',
    accentInk: '#4A3BC8',
    accentSoft: 'rgba(91, 75, 225, 0.09)',
    accentBorder: 'rgba(91, 75, 225, 0.32)',
    onAccent: '#FFFFFF',

    // Secondary accent, tags and highlights only
    ochre: '#B4762B',
    ochreInk: '#8A5716',
    ochreSoft: 'rgba(180, 118, 43, 0.10)',

    // Feedback
    success: '#1C7A47',
    successSoft: 'rgba(28, 122, 71, 0.10)',
    danger: '#B3261E',
    dangerSoft: 'rgba(179, 38, 30, 0.10)',

    // Effects
    dot: 'rgba(20, 24, 28, 0.14)',
    overlay: 'rgba(20, 24, 28, 0.55)',
    shadowSm: '0 1px 2px rgba(20, 24, 28, 0.05)',
    shadowMd: '0 8px 24px -12px rgba(20, 24, 28, 0.18)',
    shadowLg: '0 20px 48px -20px rgba(20, 24, 28, 0.24)',
  },
};

export const darkTheme = {
  ...shared,
  name: 'dark',
  colors: {
    bg: '#0F1216',
    bgAlt: '#151A20',
    surface: '#171C23',
    surfaceSunken: '#11151A',

    ink: '#ECEAE5',
    inkSecondary: '#BDC3CB',
    inkMuted: '#8A939E',

    hairline: '#262D36',
    hairlineStrong: '#3A434E',

    accent: '#9C90FF',
    accentInk: '#B4AAFF',
    accentSoft: 'rgba(156, 144, 255, 0.14)',
    accentBorder: 'rgba(156, 144, 255, 0.38)',
    onAccent: '#12121A',

    ochre: '#D9A25E',
    ochreInk: '#E6B579',
    ochreSoft: 'rgba(217, 162, 94, 0.14)',

    success: '#5FD39B',
    successSoft: 'rgba(95, 211, 155, 0.14)',
    danger: '#F1897F',
    dangerSoft: 'rgba(241, 137, 127, 0.14)',

    dot: 'rgba(236, 234, 229, 0.13)',
    overlay: 'rgba(0, 0, 0, 0.62)',
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.4)',
    shadowMd: '0 8px 24px -12px rgba(0, 0, 0, 0.6)',
    shadowLg: '0 20px 48px -20px rgba(0, 0, 0, 0.7)',
  },
};

export const themes = { light: lightTheme, dark: darkTheme };
