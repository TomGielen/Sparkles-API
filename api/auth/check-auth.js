
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[0]
        const decoded = jwt.verify(token, 'abradolf');
        req.userData = decoded
    } catch (error) {
        return res.status(401).json({
            message: 'auth failed'
        });
    }
    next();
}