const mongoose = require("mongoose");

mongoose.connect(process.env.dbURI)
    .then(res => {
        console.log("Connected Successfully");
    })
    .catch(err => {
        console.log(`Error in connecting to Database ${err}`);
    })