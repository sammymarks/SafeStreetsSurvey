import React from "react"
import { useState, useEffect, useContext } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button} from 'reactstrap'
import { useAuth0 } from "@auth0/auth0-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import DataContext from "../App/DataContext";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete"

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";


export default function NewTicketAddress ({selectedAddress, setSelectedAddress, isLoaded}) {
    
    
    const {
        ready, value, setValue,
        suggestions: {status, data},
        clearSuggestions
      } = usePlacesAutocomplete()

    const handleSelect = async(address) => {
        //False = no additional data needed
        setValue(address, false)
        clearSuggestions()
    
        //convert to lat long
        const results = await getGeocode({address})
        const {lat, lng} = await getLatLng(results[0])
        setSelectedAddress({lat, lng})
        setNewTicket({...newTicket, addressLat: selectedAddress.lat, addressLong: selectedAddress.lng })
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
    if (!isLoaded) return  <div> Loading... </div>

    return (
        <div className="NewTicketAddress">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    disabled={!ready}
                    placeholder='Search an Address'
                />
                <ComboboxPopover>
                    <ComboboxList>
                    {status == "OK" && data.map(({place_id, description}) => <ComboboxOption 
                        key={place_id} 
                        value={description}
                    />)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            <Button 
            onClick={() => getCurrentLocation()}
            >Get Current Location</Button>
        </div>
    )
}