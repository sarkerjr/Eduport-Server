const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.validateLogin = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });

        if(user){
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user.id,
                    category: user.category,
                },
                "secretKeyIwontTellYou",
                { expiresIn: "1h" }
            );

            res.status(200).json({
                token: token,
                userId: user.id,
                category: user.category
            });

        }else {
            res.status(404).send({
                isError: true,
                errorMessage: "Invalid email or password!"
            });
        }

    }catch(err) {
        console.log(err);
        res.status(502).send({
            isError: true
        });
    }
}