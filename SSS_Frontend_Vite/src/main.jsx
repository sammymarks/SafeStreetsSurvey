import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';


// import { Auth0Provider } from '@auth0/auth0-react';

//down the road - drop auth info in an .env file



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Auth0Provider
    domain="dev-gep4yvt6w6o0kdbq.us.auth0.com"
    clientId="vATKMrDT8PODgdG1AI6zWZUcYsLsCXGK"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-gep4yvt6w6o0kdbq.us.auth0.com/api/v2/",
      scope: "read:current_user update:current_user_metadata"
    }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
