import React from "react"
import { useState, useEffect, useContext } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button} from 'reactstrap'
import { useAuth0 } from "@auth0/auth0-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import DataContext from "../App/DataContext";

export default function NewTicket () {

    const initAutocomplete = () => {
        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocompleteAddress"),{
                types: ["geocode", "address", "establishment"],
                fields: ['place_id', 'geometry', 'name']
            }
        )
    }

    return (
        <div className="Address">
            <h3>Lookup Address</h3>
            <Input id="autocompleteAddress" placeholder="Enter address" type="text"/>

        </div>
    )
}