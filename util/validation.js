const { validationResult } = require('express-validator');

const handleValidationResult = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({
            errorMessage: errors.array()
        });
    }
}

module.exports = {
    handleValidationResult
}