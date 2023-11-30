import React from "react"
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Profile from '../User/UserProfile'
import NewTicket from "../Tickets/NewTicket"
import Home from "../Main/Home"

export default function Main () {

    return(
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/new-ticket" element={<NewTicket/>}/>
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )
}
