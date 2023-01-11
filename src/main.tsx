import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'components/App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'providers/AuthProvider'
import 'index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
