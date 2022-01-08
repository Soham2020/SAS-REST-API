const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token
    if(token){
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err)
                res.status(403).json("token expired")
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json("you are not authenticated!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not allowed")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("you are not an admin!")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };