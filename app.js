require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')

mongoose.connect(process.env.MONGO_CONNECT, (error, db)=>{
    if(!error)
    return console.log('Mongo Connected')
    else
    return error
})

app.use('/user', express.json(), userRouter)

app.use('/', adminRouter)

app.listen(process.env.PORT, ()=>{
    console.log('Server Running')
})