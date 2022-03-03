const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");

const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodelogin"
});

const app = express();

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "/login.html"));
});

app.post("/auth", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    if(username && password){
        connection.query("SELECT * FROM accounts WHERE username = ? AND password = ?", [username, password], (error, results, fields) => {
            if(error) throw error;

            if(results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;

                response.redirect("/home");
            } else {
                response.send("Incorrect Username and/or Password!");
            }
            response.end();
        });
    } else {
        response.send("Please enter Username and Password!");
        response.end();
    }
});

app.get("/home", (request, response) => {
    if(request.session.loggedin) {
        response.send(`Welcome back, ${request.session.username}!`);
    } else {
        response.send("Please login to view this page!");
    }
    response.end();
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});