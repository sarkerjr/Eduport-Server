const jwt = require('jsonwebtoken');

const User = require('../models/UserAccount');
const { validationResult } = require('express-validator');

exports.validateLogin = async (req, res) => {
    //Validation Handling
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({
            errorMessage: errors.array()
        });
    }

    try{
        //Verify if user exists on database
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        
        //If user exists, create token
        if(user){
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user.id,
                    accountType: user.accountType,
                },
                "secretKeyIwontTellYou",
                { expiresIn: "1h" }
            );
            
            res.status(200).json({
                token: token,
                userId: user.id,
                accountType: user.accountType
            });

        }else {
            res.status(404).send("Invalid email or password!");
        }

    }catch(err) {
        console.log("/auth/login: " + err);
        res.status(502).send("Something went wrong!");
    }
}