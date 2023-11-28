import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Auth0Wrapper from "./Auth0Wrapper";


const UserProfile = () => {
  // const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);



  // // useEffect(() => {
  // //   if (isAuthenticated && user) {
  // //     const getUserData = async () => {
  // //       try {
  // //         const accessToken = await getAccessTokenSilently();
  // //         const response = await axios.get(`http://localhost:3001/Profile/${user.sub}`, {
  // //           headers: {
  // //             Authorization: `Bearer ${accessToken}`,
  // //           },
  // //         });
  // //         setFormState(response.data);
  // //       } catch (error) {
  // //         console.error('Error fetching profile data:', error);
  // //       }
  // //     };
  // //     getUserData();
  // //   }
  // // }, [user, isAuthenticated, getAccessTokenSilently]);

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "dev-gep4yvt6w6o0kdbq.us.auth0.com";
  
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: `https://${domain}/api/v2/`,
  //           scope: "read:current_user profile email", 
  //         },
  //       });
  
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  //       console.log(user.sub)
  //       console.log("access token", accessToken)
  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       console.log(metadataResponse)
  //       const { user_metadata } = await metadataResponse.json();
  //       console.log(user_metadata)

  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  
  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);
  
  // // console.log(user)
  // // console.log(user.sub)
  // // console.log(user.email)

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  // return (
    
  //   // isAuthenticated && (
  //   //   <div>
  //   //     <img src={user.picture} alt={user.name} />
  //   //     <h2>{user.name}</h2>
  //   //     <p>{user.email}</p>
  //   //   </div>
  //   // )
    
  //   isAuthenticated && (
  //     <div>
  //       <div>TESTING</div>
  //       <img src={user.picture} alt={user.name} />
  //       <h2>{user.name}</h2>
  //       <p>{user.email}</p>
  //       {/* <h3>User Metadata</h3>
  //       {userMetadata ? (
  //         <pre>{JSON.stringify(userMetadata, null, 2)}</pre>

  //       ) : (
  //         "No user metadata defined"
  //       )} */}
  //     </div>
  //   )
  // )
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user)
  console.log(user.name)
  
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );

}

export default UserProfile;
