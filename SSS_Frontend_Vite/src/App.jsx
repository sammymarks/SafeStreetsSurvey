import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CARD_DATA from './data' //TEST DATA for ReactStrap
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap' //Imports for styled card components

import { useAuth0 } from "@auth0/auth0-react";

import Authentication from './components/authentication'
import UserProfile from './components/userprofile'


function App() {
  const [cards, setCards] = useState(CARD_DATA)
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()

useEffect(() => {
  const getToken = async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        // You now have the access token here
        console.log(token);
      } catch (error) {
        console.error('Error getting access token', error);
      }
    }
  };
  getToken()
}, [isAuthenticated, getAccessTokenSilently]
)


  const allCards = cards.map(card => (
    <Card
      style={{
        width: '18rem'
      }}
    >
      <img
        alt="Sample"
        src="https://picsum.photos/300/200"
      />
      <CardBody>
        <CardTitle tag="h5">
          {card.title}
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {card.subtitle}
        </CardSubtitle>
        <CardText>
          {card.body}
        </CardText>
        <Button>
          Click
        </Button>
      </CardBody>
    </Card>
  ))

  return (
    <div className='App'>
      <Authentication />
      <UserProfile />
      {allCards}
    </div>
  )
}

export default App
