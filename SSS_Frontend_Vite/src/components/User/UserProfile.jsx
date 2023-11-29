import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  function callAPI () {
    //API call to get all and then map projects
    
    axios
      .get("http://localhost:3001/")
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message))
  }

  async function callProtectedAPI () {
    // axios
    //   .get("http://localhost:3001/protected")
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error.message))

    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get("http://localhost:3001/protected", {
        headers: {
          authorization: `Bearer ${token}`,
          auth0Sub: user.sub
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  

  if (isLoading) {
    return <div className="UserProfile">Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="UserProfile">
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={() => callAPI()}>Show me projects</button>
        <button onClick={() => {callProtectedAPI()}}>Call Protected API Route</button>
      </div>
    )
  );
};

export default Profile;