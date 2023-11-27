import React from 'react';
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom"
import NavBar from './NavBar';
import Authentication from '../Misc/authentication';

const Header = () => {
    return (
        <div className="Header">
          <h5>This is Header</h5>
          <Authentication />
          <NavBar />
        </div>
    );
  };
  
  export default Header;