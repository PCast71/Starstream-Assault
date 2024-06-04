const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, config.jstSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.userd = user;
        next();
    });
});

module.exports = authMiddleware;