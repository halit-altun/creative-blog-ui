import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import i18n from './i18n'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (i18n.isInitialized) {
  renderApp()
} else {
  i18n.on('initialized', renderApp)
}
