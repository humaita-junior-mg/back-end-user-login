const bcrypt = require('bcryptjs')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const validate = require('./validateController')

module.exports = {
    register: async (req, res)=>{

        let {error} = validate.register(req.body)
        if(error) return res.status(400).send(error.message)

        let searchname = await User.findOne({name: req.body.name})
        if(searchname) return res.status(400).send('Name already exist, please try other')
    
        let searchemail = await User.findOne({email: req.body.email})
        if(searchemail) return res.status(400).send('Email already exist, please try other')
    
        let newuser = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }
    
        try {
            await new User(newuser).save()
            res.send(newuser)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    login: async (req, res)=>{

        let {error} = validate.login(req.body)
        if(error) return res.status(400).send(error.message)

        let searchuser = await User.findOne({email: req.body.email})
        if(!searchuser) return res.stauts(400).send('Email or Password incorrect, please try again')
    
        let password = bcrypt.compareSync(req.body.password, searchuser.password)
        if(!password) return res.stauts(400).send('Email or Password incorrect, please try again')
    
        let token = jwt.sign({_id: searchuser._id, admin: searchuser.admin}, process.env.SECRET_TOKEN)
    
        res.header('authorization-token', token)
    
        res.send('User Logged')
    }
}