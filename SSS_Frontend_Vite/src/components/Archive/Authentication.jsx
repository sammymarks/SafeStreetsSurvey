import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './loginbutton';
import LogoutButton from './logoutbutton';
import Auth0Wrapper from './Auth0Wrapper';

export default function Authentication() {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="authentication">
            {/* <Auth0Wrapper> */}
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            {/* </Auth0Wrapper> */}
        </div>
    );
}