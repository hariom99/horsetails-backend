const express = require("express");
const userRegister = express.Router()
const userLogin = express.Router();

const jwt = require("jsonwebtoken");

const secretKey = "123@123ggg";

const config = { expiresIn: "600 seconds" }

const users = [{ email: "h", password: "1", id: 0 }];

// let userToken = "";

id = 1;
userRegister.post("/", (req, res) => {
    // console.log("request recieved");
    flag = false;


    users.map((userc) => {
        if (userc.email === req.body.email) {
            flag = true;
            res.send("already registered !");
            return;
        }
    })

    if (flag === false) {

        let user = req.body;
        user = { ...user, id };
        id++;

        const payload = user;
        try {
            users.push(user);
            const token = jwt.sign(payload, secretKey, config);

            // userToken = token;
            // console.log(token);

            res.status(200).json({ success: true, message: "registered !", data: { token, payload } });
        }
        catch (err) {
            user.pop();
            res.status(400).json({ success: false, message: "error while registering or creating tok !" });
            // console.log(err);
        }
    }

})

userLogin.post("/", (req, res) => {
    // console.log("request recieved");
    flag = false;
    let user = req.body;
    users.map((userc) => {
        if (userc.email === user.email && userc.password === user.password) {
            // console.log(userc);
            flag = true;

            try {
                const payload = { ...userc }
                const token = jwt.sign(payload, secretKey, config);
                res.status(200).json({ success: true, message: "Login Success", data: { token, payload } });
            }
            catch (err) {
                res.status(400).json({ success: false, message: "error while registering or creating token !" });
            }


            return;
        }
    })

    if (flag === false) {
        res.send("not registered !");
    }

})



module.exports = { userRegister, userLogin };