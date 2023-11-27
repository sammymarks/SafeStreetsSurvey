import React from 'react';
import CARD_DATA from '../../data' //TEST DATA for ReactStrap
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap' //Imports for styled card components
import { useState, useEffect } from 'react'



export default function BootstrapTest() {
    
    const [cards, setCards] = useState(CARD_DATA)

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
        <div className="BootstrapTest">
            {allCards}
        </div>
    );
}