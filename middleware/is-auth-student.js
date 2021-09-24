const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //Check if token exist
    const token = req.get("Authorization");
    if (!token) {
        return res.status(401).send({
            message: "Token is missing"
        });
    }

    // Verify Token
    try {
        jwt.verify(token, "secretKeyIwontTellYou", (err, decoded) => {
            //Check if token is valid
            if (err) {
                return res.status(401).send({
                    message: "Token is invalid"
                });
            }

            //Check if token is for student
            if (decoded.accountType !== "student") {
                return res.status(401).send({
                    message: "Token is not for student"
                });
            }

            //Passsing the user id of the student in req body
            req.body.id = decoded.id;

            //Forwading to next middleware
            next();
        });
    } catch (err) {
        console.log("STUDENT AUTH MIDDLEWARE: " + err);
        return res.status(401).send({
            message: "Invalid Request!"
        });
    }
};
