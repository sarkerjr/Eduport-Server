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
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
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

            //Passsing the user id and department of the student in req body
            req.body.id = decoded.id;
            req.body.userDepartment = decoded.department;
            req.body.token = token;

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
