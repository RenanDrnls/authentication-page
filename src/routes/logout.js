const express = require("express");

const router = express.Router();

router.get("/logout", (request, response) => {
    if(request.session.loggedin) {
        request.session.destroy();
        response.redirect("/auth/");
    } else {
        response.send("You not have a session already.");
    }
});

module.exports = router;