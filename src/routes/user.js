const express = require("express");
const path = require("path");

const router = express.Router();

//Home route
router.get("/home", (request, response) => {
    //If loggedin of session is set with true, open the home page
    if(request.session.loggedin) {
        const username = request.session.username;
        response.render(path.join(__dirname, "../views/pages/user/home"), {user : username});
    } else {
        //If loggedin is set to false, send a message to make login
        response.send("Please, make login to view this page!");
    }
    response.end();
});

module.exports = router;