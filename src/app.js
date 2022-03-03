//Declaring consts to packages
const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth")

//Setting PORT
const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.use("/user", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});