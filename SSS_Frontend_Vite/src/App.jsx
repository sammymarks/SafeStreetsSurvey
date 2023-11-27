import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import CARD_DATA from './data' //TEST DATA for ReactStrap
// import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap' //Imports for styled card components

import { useAuth0 } from "@auth0/auth0-react";

//App Components
import Header from './components/App/Header';
import Main from './components/App/Main';
import Footer from './components/App/Footer';


import Authentication from './components/Misc/authentication'
import UserProfile from './components/Misc/userprofile'
import BootstrapTest from './components/Misc/bootstrapcards';


function App() {
//   const {isAuthenticated, getAccessTokenSilently} = useAuth0()

// useEffect(() => {
//   const getToken = async () => {
//     if (isAuthenticated) {
//       try {
//         const token = await getAccessTokenSilently();
//         // You now have the access token here
//         console.log(token);
//       } catch (error) {
//         console.error('Error getting access token', error);
//       }
//     }
//   };
//   getToken()
// }, [isAuthenticated, getAccessTokenSilently]
// )


  

  return (
    <div className='App'>
      {/* <Authentication /> */}
      <Header />
      <Main />
      <Footer />
      {/* <UserProfile /> */}
      {/* <BootstrapTest /> */}
    </div>
  )
}

export default App
