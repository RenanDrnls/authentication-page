const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/home", (request, response) => {
    const username = request.session.username;
    response.render(path.join(__dirname, "../views/pages/admin/home"), { admin: username });
});

module.exports = router;