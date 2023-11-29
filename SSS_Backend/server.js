//-------Imports-------
const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')


// const jwt = require('express-jwt')
// const jwks = require('jwks-rsa')


//Auth0



//Controllers
const userController = require("./controllers/UserControllers")
const organizationController = require("./controllers/OrganizationControllers")
const organizationImageController = require("./controllers/OrganizationImageControllers")
const projectController = require("./controllers/ProjectControllers")
const projectImageController = require("./controllers/ProjectImageControllers")
const ticketController = require("./controllers/TicketControllers")
const ticketImageController = require("./controllers/TicketImageControllers")
const ticketReviewController = require("./controllers/TicketReviewControllers")

//-------END Imports -------

const PORT = process.env.PORT || 3001;


//-------middleware-------
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

//Auth0 middleware
// const verifyJwt = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: ""
//   }),
//   audience: 'http://localhost:3001/',
//   issuer: 'https://dev-gep4yvt6w6o0kdbq.us.auth0.com/',
//   algorithm: ['RS256']

// })
const jwtCheck = auth({
  audience: 'http://localhost:3001/',
  issuerBaseURL: 'https://dev-gep4yvt6w6o0kdbq.us.auth0.com/',
  tokenSigningAlg: 'RS256'
})

// app.use(jwtCheck);
//Can do more custom middleware functions to do additional checks/reviews before accessing a db route

//-------end middleware-------

//-------CRUD------- 
//Auth0
  


  //Index
app.get("/", (req, res) => res.send("This is Index"));
app.get("/protected",jwtCheck, (req, res) => {
  // try {
  //   const accessTocken = req.headers.authorization.split(' ')[1]
  //   const response = await axios.get('https://dev-gep4yvt6w6o0kdbq.us.auth0.com/userinfo', {
  //     headers: {
  //       authorization: `Bearer ${accessTocken}`
  //     }
  //   })
  //   const userInfo = response.data
  //   console.log(userInfo)
  //   res.send(userInfo)
  // } catch (error) {
  //   res.send(error.message)
  // }

  const sub = req.get("auth0Sub")
  console.log(sub)
  res.send("This is a protected route")


});
// app.get('/authorized', (req, res) => res.send('Secured Resource'));

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || 'Internal server error'
  res.status(status).send(message)
})

//User
// app.get("/users", userController.getAll);
// app.get("/users/:id", userController.getByID);
// app.get("/users/username/:username", userController.getByUsername)
// app.get("/users/artist-search/:search", userController.searchArtist)

// app.post("/users/create", userController.postCreate)
// app.put("/users/update/:id/", userController.putUpdate)
// app.delete("/users/:id", userController.deleteDelete)

// Organization


// OrganizationImage


// Project


//ProjectImage


//Ticket


//TicketImage


//TicketReview


//-------ENDCRUD-------

//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
