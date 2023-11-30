import React from "react"
import { useState, useEffect, useContext } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button} from 'reactstrap'
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import DataContext from "../App/DataContext";


export default function NewTicket () {
    //imports and states
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
    const { loggedInUser, setLoggedInUser, dbBaseURL, setDbBaseURL, userProjects, setUserProjects,
        userTickets, setUserTickets  } = useContext(DataContext);
    const [newTicket, setNewTicket] = useState({
        project: userProjects[0]._id,
        submittedBy: loggedInUser._id,
        addressLat: "",
        addressLong: "",
        issue: [],
        location: [],
        comments: ""
    })

    //Map projects for selection
    const mappedProject = userProjects.map((project, index) => {
        return <option key={index}>{project.name}</option>
    })

    //Handle form changes

    const handleProjectChange = (projName) => {
        const index = userProjects.findIndex((e) => e.name == projName)
        setNewTicket({...newTicket, project: userProjects[index]._id} )
    }

    const handleAddressChange = (address) => {
        setNewTicket({...newTicket, addressLat: address, addressLong: address  })
    }

    const handleIssueChange = (event) => {
        console.log(event.target.selectedOptions)
        const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
        // console.log("selected", selected)
        // const allIssues = newTicket.issue
        setNewTicket({...newTicket, issue: selected  })


    }

    // console.log(newTicket)

    const handleSubmitTicket = () => {
        console.log(newTicket)
    }



    return(
        <div className="NewTicket">
            
            {
                isAuthenticated && user && !isLoading ? (
                <Form>
                    <FormGroup>
                        <Label for="projectSelect"> Project </Label>
                        <Input 
                            id="projectSelect" 
                            name="project" 
                            type="select" 
                            onChange={(event) => handleProjectChange(event.target.value)}>
                            {mappedProject}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="emailText">Address</Label>
                        <Input id="emailText" name="email" placeholder="Address" type="text"
                            onChange={(event) => handleAddressChange(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="issueSelect"> Issue </Label>
                        <Input id="issueSelect" multiple name="issueSelect" type="select"
                            onChange={handleIssueChange}
                        >
                            <option>Repair Needed</option>
                            <option>Dangerous Conditions</option>
                            <option>Missing Infrastructure</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="locationSelect"> Location </Label>
                        <Input id="locationSelect" multiple name="locationSelect" type="select">
                            <option>Sidewalk</option>
                            <option>Bike Path</option>
                            <option>Street</option>
                            <option>Intersection</option>
                            <option>Lighting</option>
                            <option>{`Other (List in comments below)`}</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">
                        Pictures
                        </Label>
                        <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                        />
                        <FormText>CAMERA IMAGE   </FormText>
                        <FormText>
                        TODO: Upload multiple images, take image from camera
                        https://medium.com/hootsuite-engineering/mobile-photo-uploads-with-html5-f7ea174ef128    
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="commentsTextArea">
                        Comments
                        </Label>
                        <Input
                        id="commentsTextArea"
                        name="comments"
                        type="textarea"
                        />
                    </FormGroup>
                    <Button 
                        style={{backgroundColor: "#CF2C28" }} 
                        onClick={() => handleSubmitTicket()}
                    > Submit 
                    </Button>
                </Form>
                ) : (
                    <div>Please login to submit a ticket</div>
                )


            }
            
            
        </div>
    )
}
