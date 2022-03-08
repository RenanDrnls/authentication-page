//Importing packages
const express = require("express");
const path = require("path");
const crypto = require("crypto");

//Connection with the database
const connection = require("../database/db");

const router = express.Router();

//Route that will receive the form to insert the data of a new user
router.get("/add-user", (request, response) => {
    response.render(path.join(__dirname, "../views/pages/new-user"));
});

router.post("/insert-user", (request, response) => {
    //Declaring variables with the infos inserted in the form
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;

    //Turn the password into a hash to insert in the database
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    if(username && hashedPassword && email){

        //Select to look if the informed username exists in the database
        connection.query("SELECT * FROM accounts WHERE username = ?",
        [username],
        (error, result, fields) => {
            //Throw the error if have it
            if(error) throw error;

            //If have one or more results of the username, operation is aborted and the user receive a notice
            if(result.length > 0){
                response.send(`Nome de usuário ${username} já cadastrado, por favor, escolha outro.`)

                //Else not have the username in the database, select to view if have the email already inserted in the database in other account
            } else {
                connection.query("SELECT * FROM accounts WHERE email = ?",
                [email],
                (error, result, fields) => {
                    //Throw the error if have it
                    if(error) throw error;

                    ////If have one or more results of the username, operation is aborted and the user receive a notice
                    if(result.length > 0){
                        response.send(`O e-mail ${email} já possui cadastro, por favor, escolha outro.`)

                    //If else not have the username and the email in the database, make the insert of the datas informed by the user
                    } else {
                        connection.query("INSERT INTO accounts(username, password, email) VALUES (?, ?, ?)",
                        [username, hashedPassword, email],
                        (error, result, fields) => {
                            if(error) throw error;

                            response.redirect("/auth");
                        });
                    };
                });
            };
        });
    };
});

module.exports = router;