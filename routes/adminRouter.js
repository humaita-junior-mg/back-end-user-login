const router = require('express').Router()
const auth = require('../controller/authController')

router.get('/admin', auth, (req, res)=>{
    if(req.user.admin)
    return res.send('This page just can saw for the admin')
    else
    return res.status(400).send('User is not admin, please leave this page')
})

module.exports = router