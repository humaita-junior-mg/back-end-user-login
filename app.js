require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRouter')

mongoose.connect(process.env.MONGOOSE_CONNECT, (error, db)=>{
    if(!error)
    return console.log('Mongo Connected')
    else
    return error
})

app.use('/user', express.json(), userRoutes)

app.use('/admin', express.json(), adminRouter)

app.listen(process.env.PORT, ()=>{
    console.log('Server Running')
})