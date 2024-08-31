const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization)
        return res.status(401).json({message: "Access Denied - Empty Authorization Header!"})     

    const token = getToken(req)

    if(!token)
        return res.status(401).json({message: "Access Denied - Token Empty!"})    

    try {
        const verified = jwt.verify(token, "brttshop")
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({message: "Invalid Token"})
    }
}

module.exports = verifyToken