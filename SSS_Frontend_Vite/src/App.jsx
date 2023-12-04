import { useState, createContext, useContext, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

import './App.css'
import DataContext from './components/App/DataContext';
import Header from './components/App/Header';
import Body from './components/App/Body';

function App() {
  //useStates for useContext across App
  //db URL
  const [dbBaseURL, setDbBaseURL] = useState(import.meta.env.VITE_DB_BASE_URL)
  //Google Maps Login

  //Authentication
  const [loggedInUser, setLoggedInUser] = useState({
      auth0sub: "",
      displayName: "",
      email: "",
      isSiteAdmin: false,
      isOrgAdmin: false
  });
  const [ userProjects, setUserProjects ] = useState([])
  const [ userTickets, setUserTickets ] = useState([])


  return (
    <div className='App'>
      <DataContext.Provider value={{
        loggedInUser, setLoggedInUser,
        dbBaseURL, setDbBaseURL,
        userProjects, setUserProjects,
        userTickets, setUserTickets  
      }}>
        <Header />
        <Body />
      </DataContext.Provider>
    </div>
  )
}

export default App
