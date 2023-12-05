//-------Imports-------
const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')

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
app.use(cors({
    origin: 'http://localhost:5173'
}));
//Set max docuement size
app.use(bodyParser.json({limit: '16mb'}) );
app.use(bodyParser.urlencoded({
  limit: '16mb',
  extended: true,
  parameterLimit:16000
}));



const jwtCheck = auth({
  audience: 'http://localhost:3001/',
  issuerBaseURL: 'https://dev-gep4yvt6w6o0kdbq.us.auth0.com/',
  tokenSigningAlg: 'RS256'
})

//Can do more custom middleware functions to do additional checks/reviews before accessing a db route

//-------end middleware-------

//-------CRUD------- 
//Auth0
  

//Index
app.get("/", (req, res) => res.send("This is Index"));

//User
app.get("/users", userController.getAll);
app.post("/users/auth/check-user", jwtCheck, userController.getOrCreateByAuth0ID)

// app.get("/users", userController.getAll);
// app.get("/users/:id", userController.getByID);
// app.get("/users/username/:username", userController.getByUsername)
// app.get("/users/artist-search/:search", userController.searchArtist)

// app.post("/users/create", userController.postCreate)
// app.put("/users/update/:id/", userController.putUpdate)
// app.delete("/users/:id", userController.deleteDelete)

// Organization
app.get("/organizations", organizationController.getAll);

// OrganizationImage


// Project
app.get("/projects", projectController.getAll);
app.get("/projects/get-by-user", jwtCheck, projectController.getByUserID);


//ProjectImage


//Ticket
app.get("/tickets", ticketController.getAll);
app.post("/tickets/create-new", jwtCheck, ticketController.postTicketsAndImages);



//TicketImage
app.get("/ticketimages", ticketImageController.getAll);


//TicketReview


//-------ENDCRUD-------

//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));