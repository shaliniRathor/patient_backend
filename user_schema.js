const mongoose= require('mongoose')
const admin_schema= mongoose.Schema({
    name:String,
    email: String,
    password: String
},{timestamps:true})

module.exports= mongoose.model("adminSchema",admin_schema)