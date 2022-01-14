const jwt = require("jsonwebtoken")
const secretKey = "123@123ggg";

const verifyToken = (token) => {
    // console.log(token);
    let isLoggedIn = false;
    jwt.verify(token, secretKey, (err, decoded) => {
        // console.log("verify user fn executed");
        let id = null;
        try {
            if (decoded === undefined)
                throw Error;
            else {
                // console.log(decoded);
                isLoggedIn = true;
                id = decoded.id;

            }
        }
        catch (err) {
            isLoggedIn = false;
            // console.log("token expired");
        }
    });

    return { isLoggedIn, id };
}

module.exports = verifyToken;