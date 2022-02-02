const User = require("../model/userModel");
const { sendVerifyEmail } = require("../Controller/mailController")

const createdOtp = "1234";  //We can generate dynamic otp for the users everytime the forgot password
const userId = "";

const controller = {
    index: (req, res) => {
        res.render("index");
    },
    login: (req, res) => {
        res.render("login")
    },
    forget: (req, res) => {
        res.render("forget");
    },

    register: async (req, res) => {
        // console.log(req.body);

        try {
            const { name, email, mobile, password } = req.body;
            const founduser = await User.findOne({ email });
            console.log(founduser);
            if (founduser != null) {
                res.send("Email already registered");
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    mobile,
                    password
                })
                // console.log(newUser);
                const result = await newUser.save();
                res.send("Registered success");
            }


        }
        catch { (err) => { console.log(err) } };
    },

    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const foundUser = await User.findOne({ email });
            // console.log(foundUser);

            if (!foundUser) {
                // console.log("user not found");
                res.send("Not Registered Email");
            }
            if (foundUser.password === password) {

                res.send("Login successfull");
            }
            else {
                res.send("Incorrect password");
            }
            // console.log(`${email} and ${password}`);
        }
        catch {
            err => {
                console.log(`Error in finding ${err}`);
            }
        }

    },
    reset: async (req, res) => {
        const { name, email } = req.body;
        try {
            const foundUser = await User.find({ name, email })
            // console.log(foundUser);
            if (foundUser.length == 0) {
                res.send("no user exist with the given credentials");
            }
            else {
                // USER FOUND FOR THE PASSWORD RESET
                userId = foundUser.__id;
                const result = await sendVerifyEmail(email, createdOtp);
                // console.log("Otp send on email");
                // res.redirect("/");
                console.log(result);
                res.render("otpVerification");

            }
        }
        catch {
            (err) => {
                console.log("Error in finding the user for forgot password");
                res.send("Error in sending the otp ");
            }
        }

    },
    verifyotp: (req, res) => {
        // res.send("Verified Successfully");
        const { otp } = req.body;
        if (otp === createdOtp) {
            // res.send("Verified success");
            res.render("resetpassword");
        }
        else {
            res.send("Invalid otp");
        }
    },

    resetnewpassword: async (req, res) => {
        const { password } = req.password;
        try {
            const user = await User.findByIdAndUpdate({ __id: userId }, { password });
            res.send("Password reset successfully Login again to enter");

        }
        catch {
            err => {
                res.send("error in updating try again later")
            }
        }

    }
}

module.exports = controller;