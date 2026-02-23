const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return fail(res, 'Access token is missing or invalid', 401);
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return fail(res, 'Access token has expired', 401);
        }
        return fail(res, 'Invalid or expired token', 403);
    }
};
module.exports = authenticateToken;
