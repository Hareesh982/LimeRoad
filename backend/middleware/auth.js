
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = payload;
       
        next();
    });

};


module.exports = verifyToken