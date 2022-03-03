//Declaring consts to packages
const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

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

//Routes for authentication or create
app.use("/auth", authRoutes);

//Routes for user inside the system
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.redirect("/auth");
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});