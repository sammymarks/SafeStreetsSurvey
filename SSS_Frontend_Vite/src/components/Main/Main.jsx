import React from "react"
import { useState } from 'react'

import LoginButton from '../Auth0/LoginButton'
import LogoutButton from '../Auth0/LogoutButton'
import Profile from '../User/UserProfile'

export default function Header () {

    return(
        <div className="Main">
            <LoginButton />
            <LogoutButton />
            <Profile />
        </div>
    )
}
