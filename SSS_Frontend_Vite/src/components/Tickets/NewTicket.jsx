import React from "react"
import { useState, useEffect, useContext } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button} from 'reactstrap'
import { useAuth0 } from "@auth0/auth0-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import DataContext from "../App/DataContext";
import Address from "./Address"


export default function NewTicket () {
    //Component Imports and States
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
    const [uploadImages, setUploadImages] = useState({ uploadFiles : "" })
    const [displayImages, setDisplayImages] = useState({ displayFiles : "" })


    //Map projects for selection
    const mappedProject = userProjects.map((project, index) => {
        return <option key={index}>{project.name}</option>
    })

    //HANDLE FORM CHANGES

    const handleProjectChange = (projName) => {
        const index = userProjects.findIndex((e) => e.name == projName)
        setNewTicket({...newTicket, project: userProjects[index]._id} )
    }

    const handleAddressChange = (address) => {
        setNewTicket({...newTicket, addressLat: address, addressLong: address  })
    }

    const handleIssueChange = (event) => {
        const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
        setNewTicket({...newTicket, issue: selected  })
    }

    const handleLocationChange = (event) => {
        const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
        setNewTicket({...newTicket, location: selected  })
    }

    const handleCommentsChange = (text) => {
        setNewTicket({...newTicket, comments: text  })
    }

    //HANDLE SUBMIT
    const handleSubmitTicket = async (event) => {
        console.log(newTicket)
        console.log(uploadImages)
        //VITE_DB_BASE_URL = "http://localhost:3001/"
        const token = await getAccessTokenSilently()
        const response = await axios.post(`${dbBaseURL}tickets/create-new`, {
            ticket : newTicket,
            images : uploadImages
        }, {
            headers: {
            authorization: `Bearer ${token}`,
            auth0sub: user.sub,
            }
        })
        }

    //GET CURRENT LOCATION
    //https://www.tutorialspoint.com/html5/geolocation_getcurrentposition.htm
    function locationErrorHandler(err) {
        if(err.code == 1) {
           alert("Error: Access is denied!");
        } else if( err.code == 2) {
           alert("Error: Position is unavailable!");
        }
     }

     async function showLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude : " + latitude + " Longitude: " + longitude);
        const addressObj = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
        console.log(addressObj.data.display_name)
     }


     function getCurrentLocation () {
        const locationObj = {lat: "", long: ""}
        if (navigator.geolocation) {
            console.log("location running")
            const options = {timeout:60000};
            navigator.geolocation.getCurrentPosition(showLocation, locationErrorHandler, options);
        } else {
          alert("Geolocation is not supported by this browser.")
        }
        
      }
      

    //IMAGE UPLOADS
    //File Upload and b64 conversion https://www.youtube.com/watch?v=pfxd7L1kzio
    //Image compression https://imagekit.io/blog/image-compression-techniques-in-javascript/; https://www.npmjs.com/package/browser-image-compression

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {      
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
              };
              reader.onerror = (error) => {
                reject(error)
              }
        })
    }

    const compressFileto16MB = async(file) => {
        console.log("compressFile function running")
        console.log(file)
        const options = {
            maxSizeMB: 0.75,
            useWebWorker: true,
        }
        console.log(options)
        if ((file.size/1024/1024)>1) {
            console.log('compressing')
            const compressedFile =  await imageCompression(file, options)
            return compressedFile
        } else return file

    }

    const compressFileto300Width = async(file) => {
        console.log("compressFile function running")
        console.log(file)
        const options = {
            maxWidthOrHeight: 300,
            useWebWorker: true,
        }
        console.log(options)
        if ((file.size/1024/1024)>1) {
            console.log('compressing')
            const compressedFile =  await imageCompression(file, options)
            return compressedFile
        } else return file

    }

    //Single file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        
        const stagedFile = await compressFileto16MB(file)
        console.log("staged file size", stagedFile.size)
        const b64ForUpload = await fileToBase64(stagedFile)
        setUploadImages({...uploadImages, uploadFiles : b64ForUpload })

        const displayFile = await compressFileto300Width(file)
        const b64ForDisplay = await fileToBase64(displayFile)
        setDisplayImages({...displayImages, displayFiles : b64ForDisplay })        
    }

    // useEffect(() => {

    // }, [uploadImages])


    



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
                    {/* <Address /> */}
                    
                    <FormGroup>
                        <Label for="emailText">Address</Label>
                        <Input id="emailText" name="email" placeholder="Address" type="text"
                            onChange={(event) => handleAddressChange(event.target.value)}
                        />
                        <Button onClick={() => getCurrentLocation()}>Get Current Location</Button>
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
                        <Input id="locationSelect" multiple name="locationSelect" type="select"
                        onChange={handleLocationChange}>
                            <option>Sidewalk</option>
                            <option>Bike Path</option>
                            <option>Street</option>
                            <option>Intersection</option>
                            <option>Lighting</option>
                            <option>{`Other (List in comments below)`}</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pictureFile">
                        Pictures
                        </Label>
                        <Input
                        id="pictureFile"
                        name="file"
                        type="file"
                        onChange={handleFileUpload}
                        />
                        <FormText>CAMERA IMAGE   </FormText>
                        <FormText>
                        TODO: Upload multiple images, take image from camera
                        https://medium.com/hootsuite-engineering/mobile-photo-uploads-with-html5-f7ea174ef128    
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageFiles">
                        Images
                        </Label>
                    </FormGroup>
                    <img src={displayImages.displayFiles} alt="" />
                    <FormGroup>
                        <Label for="commentsTextArea">
                        Comments
                        </Label>
                        <Input
                        id="commentsTextArea"
                        name="comments"
                        type="textarea"
                        onChange={(event) => handleCommentsChange(event.target.value)}
                        />
                    </FormGroup>
                    <Button 
                        style={{backgroundColor: "#CF2C28" }} 
                        onClick={(event) => handleSubmitTicket(event)}
                    > Submit 
                    </Button>
                </Form>
                ) : (
                    <div>Please login to submit a ticket</div>
                )


            }
            
            <h1>Demo - Native camera in browsers</h1>

            <label htmlFor="cameraFileInput">
            <span className="btn">Open camera</span>

            <input
                id="cameraFileInput"
                type="file"
                accept="image/*"
                capture="environment"
            />
            </label>
            
        </div>
    )
}
