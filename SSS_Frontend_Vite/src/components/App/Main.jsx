import React from 'react';
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom"
import Home from '../Main/Home';
import Callback from '../Main/Callback';
import Profile from '../Auth0/Profile'




const Main = () => {
    return (
        <div className="Main">
          <h5>This is Main</h5>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/callback" element={<Callback/>} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
  };
  
  export default Main;