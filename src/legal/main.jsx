import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import '../index.css';

import LegalLayout from './LegalLayout';
import Impressum from './Impressum';
import Privacy from './Privacy';

/**
 * Entry for the standalone legal pages. They are real HTML files
 * (impressum/index.html, datenschutz/index.html) rather than client routes,
 * so GitHub Pages serves them directly and the prerender step can bake their
 * text into the HTML for visitors without JavaScript.
 */
const pages = { impressum: Impressum, datenschutz: Privacy };

const root = document.getElementById('root');
const Page = pages[root.dataset.page];

createRoot(root).render(
  <StrictMode>
    <LegalLayout>
      <Page />
    </LegalLayout>
  </StrictMode>,
);
