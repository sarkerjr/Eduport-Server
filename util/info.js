/* 
    This file is used for retrieving valid creditials from JSON WEB TOKEN.
*/

const Student = require('../models/Student');

exports.getStudentInfo = async (id) => {
    try {
        return await Student.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true
        });
    } catch (err) {
        console.log("/util/info.js" + err);
    }  
}