/**
 * Design tokens: bold brutalist.
 *
 * Every colour, font, radius and spacing step in the site comes from here.
 * Components should never hardcode a hex value. Reach for `theme.colors.*`
 * so light and dark stay in sync.
 *
 * The rules this direction follows:
 *   - Type is the loudest thing on the page. Heavy, wide, uppercase, huge.
 *   - Borders are thick and black (thick and bone-white in dark mode). No
 *     hairlines, no soft separators.
 *   - Depth comes from hard offset shadows, never from blur or gradient.
 *   - Colour arrives in flat saturated blocks. Three of them, not one.
 *   - Nothing is rounded and nothing fades. Transitions are short and abrupt.
 *
 * Colour rule worth knowing before editing: `accent` (yellow) and `accentAlt`
 * (orange) are FILL-ONLY. Neither has the contrast to be used as text against
 * the page. `accentInk` is the text-safe accent: blue in light, yellow in
 * dark. Every value below was hand-checked for WCAG AA.
 */

// Archivo Variable carries a width axis as well as weight, which is what lets
// the display type go heavy AND wide. Space Mono handles every label, date and
// counter.
const archivo =
  "'Archivo Variable', Archivo, Helvetica, -apple-system, BlinkMacSystemFont, Arial, sans-serif";
const spaceMono = "'Space Mono', 'JetBrains Mono Variable', ui-monospace, monospace";

const fonts = {
  display: archivo,
  body: archivo,
  mono: spaceMono,
};

// Square. Every corner, no exceptions.
const radii = {
  sm: '0',
  md: '0',
  lg: '0',
  xl: '0',
  pill: '0',
};

// Borders are structural here, so they get their own scale.
const borders = {
  thin: '2px',
  base: '3px',
  thick: '5px',
  slab: '8px',
};

const layout = {
  maxWidth: '1320px',
  readWidth: '620px',
  gutter: '2rem',
  gutterMobile: '1rem',
};

// Short and abrupt. Nothing eases gently in this direction.
const motionTokens = {
  fast: '80ms cubic-bezier(0.2, 0, 0, 1)',
  base: '140ms cubic-bezier(0.2, 0, 0, 1)',
  slow: '240ms cubic-bezier(0.2, 0, 0, 1)',
};

const shared = { fonts, radii, borders, layout, motion: motionTokens };

export const lightTheme = {
  ...shared,
  name: 'light',
  colors: {
    // Surfaces: warm newsprint, deliberately not white
    bg: '#F4F1E6',
    bgAlt: '#E8E2CE',
    surface: '#FFFFFF',
    surfaceSunken: '#EDE8D6',

    // Text, all checked against `bg`
    ink: '#0D0D0D', //          17.2:1
    inkSecondary: '#2E2E2E', // 12.0:1
    inkMuted: '#5A564A', //      6.5:1

    /*
     * "Hairline" is a misnomer in this direction: separators are the same
     * black as the text and 2px or thicker. The names are kept so components
     * stay portable between design directions.
     */
    hairline: '#0D0D0D',
    hairlineStrong: '#0D0D0D',

    // Fill-only accents. Never set type in these on `bg`.
    accent: '#FFE800', //        black on it: 15.5:1
    accentAlt: '#FF4D19', //     black on it:  5.9:1
    accentSoft: '#FFF7A8',
    accentBorder: '#0D0D0D',
    onAccent: '#0D0D0D',
    onAccentAlt: '#0D0D0D',

    // The text-safe accent: links, active states, anything set in type.
    accentInk: '#1B2FE8', //     7.1:1 on bg, white on it 8.0:1
    onAccentInk: '#FFFFFF',

    /*
     * No ochre here. These alias onto the orange and the muted ink so
     * components written for the editorial theme (the thesis aside in
     * Education, for one) still read correctly instead of breaking.
     */
    ochre: '#FF4D19',
    ochreInk: '#5A564A',
    ochreSoft: '#FFE0D4',

    // Feedback
    success: '#0F7A3D',
    successSoft: '#C8ECD6',
    danger: '#C41E00', //        5.3:1
    dangerSoft: '#FFD9CE',

    /*
     * Depth is a hard offset block of ink, never a blur. The legacy shadow
     * names map onto the same idea so nothing renders soft by accident.
     */
    dot: '#0D0D0D',
    overlay: 'rgba(13, 13, 13, 0.82)',
    shadowHardSm: '3px 3px 0 #0D0D0D',
    shadowHard: '5px 5px 0 #0D0D0D',
    shadowHardLg: '8px 8px 0 #0D0D0D',
    shadowSm: '3px 3px 0 #0D0D0D',
    shadowMd: '5px 5px 0 #0D0D0D',
    shadowLg: '8px 8px 0 #0D0D0D',
  },
};

export const darkTheme = {
  ...shared,
  name: 'dark',
  colors: {
    bg: '#0D0D0D',
    bgAlt: '#1B1B16',
    surface: '#151515',
    surfaceSunken: '#080808',

    ink: '#F4F1E6', //          17.2:1
    inkSecondary: '#CFCABA', // 12.4:1
    inkMuted: '#948E7D', //      6.2:1

    hairline: '#F4F1E6',
    hairlineStrong: '#F4F1E6',

    accent: '#FFE800',
    accentAlt: '#FF6B3D',
    accentSoft: '#3D3800',
    accentBorder: '#F4F1E6',
    onAccent: '#0D0D0D',
    onAccentAlt: '#0D0D0D',

    // On black the yellow is the text-safe one at 15.5:1. The blue is not.
    accentInk: '#FFE800',
    onAccentInk: '#0D0D0D',

    ochre: '#FF6B3D',
    ochreInk: '#948E7D',
    ochreSoft: '#2B1509',

    success: '#57D98A',
    successSoft: '#0E2E1B',
    danger: '#FF6B3D', //        6.9:1
    dangerSoft: '#2B1509',

    dot: '#F4F1E6',
    overlay: 'rgba(0, 0, 0, 0.85)',
    shadowHardSm: '3px 3px 0 #F4F1E6',
    shadowHard: '5px 5px 0 #F4F1E6',
    shadowHardLg: '8px 8px 0 #F4F1E6',
    shadowSm: '3px 3px 0 #F4F1E6',
    shadowMd: '5px 5px 0 #F4F1E6',
    shadowLg: '8px 8px 0 #F4F1E6',
  },
};

export const themes = { light: lightTheme, dark: darkTheme };
