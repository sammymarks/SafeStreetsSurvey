const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//-------Imports-------

//Auth0
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '3feb1ea889d2c4aaac720d9a0ed2c3ebeaaebefe576841bdbb773979ece5eeae',
  baseURL: 'http://localhost:5173',
  clientID: 'vATKMrDT8PODgdG1AI6zWZUcYsLsCXGK',
  issuerBaseURL: 'https://dev-gep4yvt6w6o0kdbq.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


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


//middleware
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
//end middleware

//-------CRUD------- 
//Index
app.get("/", (req, res) => res.send("This is Index"));

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
