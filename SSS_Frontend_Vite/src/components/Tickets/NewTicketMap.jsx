import React from "react"
import { useState, useEffect, useContext, useMemo } from 'react'
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


export default function NewTicketMap ({selectedAddress, setSelectedAddress, isLoaded}) {
    // const center = useMemo(() => ({lat: 41.983720, lng: -87.689710}), [])
    console.log(selectedAddress)

    if (!isLoaded) return  <div> Loading... </div>
    return (
        <div className="NewTicketMap">
            <GoogleMap zoom={14} center = {selectedAddress} mapContainerClassName='map-container'>
            <Marker position={selectedAddress} />
            </GoogleMap>
        </div>
    )
}