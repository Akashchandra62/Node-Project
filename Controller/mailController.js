const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "authEmail",
        pass : "authEmailPassword"
    } 

})

module.exports.sendVerifyEmail = async (email, otp) =>{
    var url = "http://localhost:3000/reset";
    // console.log("sending email");
    try{
        const idmail = await transport.sendMail({
                        from : "authEmail",
                        to : email,
                        subject :  "OTP Verification",
                        // text : `OTP for verification is :`,
                        html: `<h2>OTP for Verification is ${otp}</h2>`

                     })
        // console.log("sent Success" + idmail);
    }
    catch{
        (err) =>{
            console.log("Error in sending");
        }
    }
    
}
