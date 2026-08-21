import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts, so no third-party requests and nothing to consent to.
// Archivo's width axis is the point: the display type needs to go heavy and
// wide at once. Space Mono takes every label, date and counter.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
