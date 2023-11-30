import { useState, createContext, useContext, useEffect } from 'react'
import './App.css'
import DataContext from './components/App/DataContext';
import Header from './components/App/Header';
import Body from './components/App/Body';



function App() {

  //useStates for useContext across App
  const [dbBaseURL, setDbBaseURL] = useState(import.meta.env.VITE_DB_BASE_URL)
  const [loggedInUser, setLoggedInUser] = useState({
      auth0sub: "",
      displayName: "",
      email: "",
      isSiteAdmin: false,
      isOrgAdmin: false
  });

  console.log(loggedInUser)


  return (
    <div className='App'>
      <DataContext.Provider value={{
        loggedInUser, setLoggedInUser,
        dbBaseURL, setDbBaseURL  
      }}>
        <Header />
        <Body />
      </DataContext.Provider>
    </div>
  )
}

export default App
