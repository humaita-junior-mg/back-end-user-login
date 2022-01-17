const router = require('express').Router()
const auth = require('../controller/authController')

router.get('/', auth, (req, res)=>{

    if(req.user.admin)
    return res.send('Esse dado só deve ser visto pelo Admin')
    else
    res.status(401).send('Access Denied') 
    
})


module.exports = router

