//Declaring consts to packages
const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const newUserRoutes = require("./routes/insertUser");

//Setting PORT
const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "static")));

//Routes for authentication
app.use("/auth", authRoutes);

app.use("/new-user", newUserRoutes);

//Routes for user inside the system
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.redirect("/auth");
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});