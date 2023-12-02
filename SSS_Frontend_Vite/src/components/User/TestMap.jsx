import React, { useState, useCallback, useMemo } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete"

const TestMap = () => {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : import.meta.env.VITE_GOOGLE_MAPS_PLACE_API_KEY,
  })
  
  if (!isLoaded) return  <div> Loading... </div>
  return (
    <>
      <Autocomplete />
      <Map />
    </>
  )
}

const Autocomplete = () => {

  return (
    <div>AUTOCOMPLETE</div>
  )
}


const Map = () => {
  const center = useMemo(() => ({lat: 44, lng: -80}), [])

  return (  
    //Map = Zoom, Center of Map, Container Class Name
    //Marker = position 
    <GoogleMap zoom={10} center = {center} mapContainerClassName='map-container'>
      <Marker position={center} />
    </GoogleMap>
  )
}











export default TestMap;