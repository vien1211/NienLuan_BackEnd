const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: 'ERROR'
        });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: 'ERROR'
        });
    }

    jwt.verify(tokenParts[1], process.env.ACCESS_TOKEN, function (err, user) {
        if (err || !user || !user.isAdmin) {
            return res.status(401).json({
                message: 'Unauthorized',
                status: 'ERROR'
            });
        }
        next();
    });
};

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: 'ERROR'
        });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: 'ERROR'
        });
    }

    const userId = req.params.id;
    jwt.verify(tokenParts[1], process.env.ACCESS_TOKEN, function (err, user) {
        if (err || !user || (!user.isAdmin && user.id !== userId)) {
            return res.status(401).json({
                message: 'Unauthorized',
                status: 'ERROR'
            });
        }
        next();
    });
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare
};
