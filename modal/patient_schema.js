const mongoose= require("mongoose")
const Patient_schema= mongoose.Schema({ 
    name:String,
    age:Number,
    email:String,
    gender:String,
    phoneNo:String,
    address:String,
    pincode:Number,
    treatment:String,
    emergency: Boolean,
    remark:String
},{timestamps:true})

module.exports= mongoose.model("patinies",Patient_schema)