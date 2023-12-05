//Globals
import React from "react"
import axios from "axios"
//Destructures
import { useState, useEffect, useContext } from 'react'
import { Link, Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
//Assets
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap'
//Components
import DataContext from "../App/DataContext";

export default function BrowseProjects () {
    //UseContext
    const { loggedInUser, setLoggedInUser, dbBaseURL, setDbBaseURL, userProjects, setUserProjects,
        userTickets, setUserTickets, allProjects, setAllProjects } = useContext(DataContext);




        
    return (
        <div className="BrowseProjects">BrowseProjects
        
        </div>
    )
}