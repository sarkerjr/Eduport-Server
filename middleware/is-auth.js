const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Check if token exist
    const token = req.get('Authorization');
    if(!token) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    // Verify Token
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'secretKeyIwontTellYou');
    }catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    //Forwarding the request
    req.body.userId = decodedToken.id;
    next();
};