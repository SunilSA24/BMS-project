const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.jwt_secret);
        req.body = {};
        req.body.userId = verifiedToken.userId
        next();
    } catch(err) {
        res.status(401).send({success: false, message: "Token Invalid"});
    }
    
}

module.exports = auth;