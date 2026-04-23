const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next){
    try {
        let token = req.headers.authorization

        if (!token) {
            return res.status(400).send({ msg: "Please Login" })
        }

        if (token.startsWith("Bearer")) {
            token = token.split(" ")[1]

            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            req.user = decoded 
            // console.log(req.user, "((((((()))))))")
            next()
        } else {
            return res.status(401).send({ msg: "Not authorized" })
        }

    } catch (error) {
        console.error("Auth Error:", error.message)

        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ msg: "Token expired, login again" })
        }

        return res.status(401).send({ msg: "Invalid token" })
    }
}

function admin(req, res, next) {
    if (!req.user) {
        return res.status(401).send({ msg: "Unauthorized" })
    }

    if (req.user.role === "admin") {
        next()
    } else {
        return res.status(403).send({ msg: "Access denied" })
    }
}


module.exports = {auth, admin}