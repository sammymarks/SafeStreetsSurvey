import React from 'react';
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom"
import Home from '../Main/Home';
import Callback from '../Main/Callback';
import UserProfile from '../Misc/userprofile';



const Main = () => {
    return (
        <div className="Main">
          <h5>This is Main</h5>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/callback" element={<Callback/>} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </div>
    );
  };
  
  export default Main;