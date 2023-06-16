import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//context
import { QuizzProvider } from './context/QuizzContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizzProvider>
      <App />
    </QuizzProvider>
  </React.StrictMode>,
)
