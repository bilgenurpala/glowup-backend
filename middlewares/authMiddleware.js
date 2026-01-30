const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return fail(res, 401, 'Access token is missing or invalid');
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return fail(res, 401, 'Access token has expired');
        }
        return fail(res, 403, 'Invalid or expired token');  
    }
};
module.exports = authenticateToken;