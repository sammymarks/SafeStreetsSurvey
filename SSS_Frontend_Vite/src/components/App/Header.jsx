import React from 'react';
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom"
import NavBar from './NavBar';
import LoginButton from '../Archive/LoginButton';
import LogoutButton from '../Auth0/LogoutButton';



const Header = () => {
  const navigate = useNavigate();
  
  const goToProfile = () => {
    navigate()
  }

  return (
        <div className="Header">
          <h5>This is Header</h5>
          <LoginButton />
          <LogoutButton />
          <button onClick={() => navigate('/profile')}>Profile</button>
          <NavBar />
        </div>
    );
  };
  
  export default Header;