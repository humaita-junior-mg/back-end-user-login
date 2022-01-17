const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('./validate')

module.exports = {
    register: async (req, res)=>{

        let {error} = validate.registerValidate(req.body)
        if(error){
            return res.status(400).send(error.message)
        }

        /* 
        
        the same thing that: 

        let error = validate.registerValidate(req.body).error
        if(error){
            return res.status(400).send(error.message)
        }

        quando colocamos as chaves, estamos utilizando o --destructuring assignment-- , buscando um dado dentro do objeto a que igualamos
        
        */
        
        

        let verifyname = await User.findOne({name: req.body.name})
        if(verifyname) return res.status(400).send('Name alredy exist in Data Base')
    
        let verifyemail = await User.findOne({email: req.body.email})
        if(verifyemail) return res.status(400).send('Email alredy exist in Data Base')
    
        let newuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
    
        try {
            await newuser.save()
            res.status(200).send('User created with sucess')
        } catch (error) {
            res.status(400).send(error)
        }
    },

    login: async (req, res)=>{

        let {error} = validate.loginValidate(req.body)
        if(error){
            return res.status(400).send(error.message)
        }

        let searchuser = await User.findOne({email: req.body.email})
        if(!searchuser) return res.status(400).send('Account not found')

        let userpassword = bcrypt.compareSync(req.body.password, searchuser.password)
        if(!userpassword) return res.status(400).send('Account not found')

        let token = jwt.sign({_id: searchuser._id, admin: searchuser.admin}, process.env.SECRET_TOKEN)

        res.header('authorization-token', token)

        res.send('User Logged')
    }
}