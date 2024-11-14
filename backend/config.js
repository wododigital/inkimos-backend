const host="localhost";
const database="inkimos";
const user="wododigital";
const password="Wodo@123";
const jwt_secret="92154578f53f8c1a8a3a8d2288ff7ade258e5e45ebf837458652f03adf48db7c";
const url=['http://localhost:5173', 'http://localhost:3000'];
const live=['http://localhost:5173'];


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

function getCurrentDateTimeString() {
    const date = new Date();
    return date.getFullYear() + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
}

module.exports = {
    host,
    database,
    user,
    password,
    jwt_secret,
    url,
    live,
    authenticateToken,
    getCurrentDateTimeString
};