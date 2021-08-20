const user = require("../models/UserAccount");

exports.createUser = async (req, res, next) => {
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
                isError: false,
                user: user,
            });
        }
    } catch (err) {
        res.status(502).send("Can not create user!");
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.find({
            where: {
                email: email,
                password: password,
            },
        });

        if (user) {
            res.status(200).json({
                user: user,
            });
        } else res.status(404).send("user not found!");
    } catch (err) {
        res.status(502).send("Can not login user!");
    }
};
