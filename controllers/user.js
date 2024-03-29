const { validationResult } = require('express-validator');

const User = require("../models/UserAccount");

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({
            errorMessage: errors.array()
        });
    }

    try {
        const user = await User.findOrCreate({
            where: {
                email: req.body.email,
                password: req.body.password,
                accountType: req.body.accountType,
                department: req.body.department,
            },
        });

        if (user) {
            res.status(200).send({
                user: user,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(502).send("Can not create user!");
    }
};
