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
  const [ userProjects, setUserProjects ] = useState([])
  const [ userTickets, setUserTickets ] = useState([])
  console.log(loggedInUser)


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
