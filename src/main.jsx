import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts, so no third-party requests and nothing to consent to.
import '@fontsource/instrument-serif/400.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
