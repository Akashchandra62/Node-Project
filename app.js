require('dotenv').config();
const express = require("express");
const routes = require('./Routes/router');
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
require("./db/dbConnection");   //Connecting to DataBase

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(routes);



app.listen(PORT , ()=>{
    console.log("Listen success");
})