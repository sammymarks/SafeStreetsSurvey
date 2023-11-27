import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react';

//down the road - drop auth info in an .env file



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-gep4yvt6w6o0kdbq.us.auth0.com"
    clientId="nt9Ocx2jl6sHu6LJxpbSXg63DRxozgdp"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
