const express= require('express')
const mongoose= require('mongoose')
const morgan = require('morgan')
require("dotenv").config()
const cors= require("cors")
const route= require('./patient_routes')
const app= express()
const port= 5000
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use('/api',route)

app.get('/',(req,res)=>{
    res.send('api is running')
})
  
app.listen(port,()=>{
    console.log("Server is Listen on ",port)
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Mongodb connected !!")
    })
    .catch((err)=>{
        console.log(err,"Not connected to Mongodb !!")})

})