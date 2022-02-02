const express = require("express");
const route = express.Router();
const controller = require("../Controller/mainController")
const { sendVerifyEmail } = require("../Controller/mailController")

route.get("/", controller.index);
route.get("/login", controller.login);
route.get("/forget", controller.forget)

route.post("/register", controller.register);
route.post("/login", controller.postLogin);
route.post("/reset", controller.reset);
route.post("/verifyotp", controller.verifyotp);
route.post("/resetnewpassword", controller.resetnewpassword);

// route.get("/verifyemail", async (req, res)=>{
//     try{
//     const res = await sendVerifyEmail("akashchandra8544@gmail.com", 8560);
//     console.log("okk");
//     res.send(res);
//     }
//     catch{
//         (err)=>{
//             console.log("Error in sending email");
//         }
//     }
//     // next();
// })

module.exports = route;