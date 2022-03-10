//Importing packages
const express = require("express");

//Set router with express Router
const router = express.Router();

//Logout route
router.get("/logout", (request, response) => {
    //If the user have a session, detroy the session and redirect to login page
    if(request.session.loggedin) {
        request.session.destroy();
        response.redirect("/auth/");
    } else {
        //Else, inform to the user 
        response.send("You not have a session already.");
    }
});

module.exports = router;