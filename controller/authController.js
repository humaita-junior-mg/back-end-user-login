const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const token = req.header('authorization-token')
    if(!token) return res.status(400).send('Access Denied')

    try {
        let userVerified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = userVerified
        next()
    } catch (error) {
        res.status(400).send('User is not admin, please leave this page')
    }
}