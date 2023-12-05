//GENERAL
import React from "react"
import { useState, useEffect, useContext, useMemo } from 'react'
import axios from "axios";
//REACTSTRAP
import {Form, FormGroup, FormText, Label, Input, Button, Spinner} from 'reactstrap'
//AUTH0
import { useAuth0 } from "@auth0/auth0-react" //AUTH0
//IMAGE COMPRESSION
import imageCompression from "browser-image-compression"
//GOOGLE MAPS API
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete"
//COMBOBOX
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
//COMPONENTS
import DataContext from "../App/DataContext";
import NewTicketAddress from "./NewTicketAddress";
import NewTicketMap from "./NewTicketMap";


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
    const [switchState, setSwitchState] = useState({
        issue: {
            repairNeeded: false,
            dangerousConditions: false,
            missingInfrastructure: false
        },
        location: {
            sidewalk: false,
            bikePath: false,
            street: false,
            intersection: false,
            lighting: false,
            other: false
        }
    })
    const [uploadImages, setUploadImages] = useState({ uploadFiles : "" })
    const [displayImages, setDisplayImages] = useState({ displayFiles : "" })
    const [selectedAddress, setSelectedAddress] = useState({lat: 41.983720, lng: -87.689710})
    // const [currentLocationLoading, setCurrentLocationLoading] = useState(false)
    // console.log(selectedAddress)

    //GOOGLE MAPS API
    //https://github.com/JustFly1984/react-google-maps-api/issues/238
    const [ GMapsLibraries ] = useState(['places']);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey : import.meta.env.VITE_GOOGLE_MAPS_PLACE_API_KEY,
        libraries: GMapsLibraries
      })

    //.map projects for selection
    const mappedProject = userProjects.map((project, index) => {
        return <option key={index}>{project.name}</option>
    })

    //HANDLE FORM CHANGES

    const handleProjectChange = (projName) => {
        const index = userProjects.findIndex((e) => e.name == projName)
        setNewTicket({...newTicket, project: userProjects[index]._id} )
    }

    const handleAddressChange = (address) => {
        setNewTicket({...newTicket, addressLat: selectedAddress.lat, addressLong: selectedAddress.lng })
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

    //HANDLE FORM SUBMIT
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

    //IMAGE UPLOADS
    

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

    useEffect(() => {
        console.log(switchState)
    }, [switchState])


    



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
                    {!isLoaded ? <div> Loading... </div> : 
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <NewTicketAddress id="emailText" name="email" 
                                selectedAddress={selectedAddress} 
                                setSelectedAddress={setSelectedAddress} 
                                isLoaded={isLoaded}
                                newTicket={newTicket}
                                setNewTicket={setNewTicket}
                            />
                            <NewTicketMap 
                                selectedAddress={selectedAddress} 
                                setSelectedAddress={setSelectedAddress} 
                                isLoaded={isLoaded}
                                newTicket={newTicket}
                                setNewTicket={setNewTicket}
                            />
                        </FormGroup>
                    }
                    <FormGroup>
                        <Label for="issueSelect"> Issue (Select at least One)</Label>

                        {/* <Input id="issueSelect" multiple name="issueSelect" type="select"
                            onChange={handleIssueChange}
                        >
                            <option>Repair Needed</option>
                            <option>Dangerous Conditions</option>
                            <option>Missing Infrastructure</option>
                        </Input> */}
                        <FormGroup switch>
                            <Input type="switch" role="switch"
                            checked={switchState.issue.repairNeeded} 
                            onClick={()=>{setSwitchState({...switchState, issue : {...switchState.issue, repairNeeded: !switchState.issue.repairNeeded}})}}
                            />
                            <Label check>Repair Needed</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.issue.dangerousConditions} 
                                onClick={()=>{setSwitchState({...switchState, issue : {...switchState.issue, dangerousConditions: !switchState.issue.dangerousConditions}})}}
                            />
                            <Label check>Dangerous Conditions</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.issue.missingInfrastructure} 
                                onClick={()=>{setSwitchState({...switchState, issue : {...switchState.issue, missingInfrastructure: !switchState.issue.missingInfrastructure}})}}
                            />
                            <Label check>Missing Infrastructure</Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="locationSelect"> Location (Select at least one) </Label>
                        {/* <Input id="locationSelect" multiple name="locationSelect" type="select"
                        onChange={handleLocationChange}>
                            <option>Sidewalk</option>
                            <option>Bike Path</option>
                            <option>Street</option>
                            <option>Intersection</option>
                            <option>Lighting</option>
                            <option>{`Other (List in comments below)`}</option>
                        </Input> */}
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.location.sidewalk} 
                                onClick={()=>{setSwitchState({...switchState, location : {...switchState.location, sidewalk: !switchState.location.sidewalk}})}}
                            />
                            <Label check>Sidewalk</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.location.bikePath} 
                                onClick={()=>{setSwitchState({...switchState, location : {...switchState.location, bikePath: !switchState.location.bikePath}})}}
                            />
                            <Label check>Bike Path</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.location.street} 
                                onClick={()=>{setSwitchState({...switchState, location : {...switchState.location, street: !switchState.location.street}})}}
                            />
                            <Label check>Street</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.location.intersection} 
                                onClick={()=>{setSwitchState({...switchState, location : {...switchState.location, intersection: !switchState.location.intersection}})}}
                            />
                            <Label check>Intersection</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.location.lighting} 
                                onClick={()=>{setSwitchState({...switchState, location : {...switchState.location, lighting: !switchState.location.lighting}})}}
                            />
                            <Label check>Lighting</Label>
                        </FormGroup>
                        <FormGroup switch>
                            <Input type="switch" role="switch" 
                                checked={switchState.location.other} 
                                onClick={()=>{setSwitchState({...switchState, location : {...switchState.location, other: !switchState.location.other}})}}
                            />
                            <Label check>Other (List in comments below)</Label>
                        </FormGroup>
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
            

            
        </div>
    )
}
