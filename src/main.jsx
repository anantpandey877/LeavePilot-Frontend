import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import faviconUrl from './assets/favicon.ico'

document.title = 'LeavePilot'
const favicon = document.querySelector('#app-favicon')

if (favicon) {
  favicon.href = `${faviconUrl}?v=2`
  favicon.type = 'image/x-icon'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
