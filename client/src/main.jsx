import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Check if admin route and strip tailwind interference
if (window.location.pathname.startsWith('/admin')) {
  document.documentElement.style.cssText = 'margin:0;padding:0;background:#0f3460;height:100%';
  document.body.style.cssText = 'margin:0;padding:0;background:#0f3460;height:100%;overflow:hidden';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)