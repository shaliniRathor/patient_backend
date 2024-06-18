const patient_schema = require("./modal/patient_schema")
const admin_schema= require('./user_schema')
var bcrypt = require('bcryptjs');

const getAllPatient= async(req,res)=>{ 
    try {
        let find;
        const searchValue= req?.query?.searchdata
        console.log("search====>",searchValue);
        if (searchValue) {
            const searchRegex= new RegExp( searchValue,'i')
            find= await patient_schema.find({name:{$regex:searchRegex}} )

            //email 2nd condition//
            if(!find?.length){
            find= await patient_schema.find({email:{$regex:searchRegex}} )

            //phone Number 3rd condition
            if (!find?.length) {
            find= await patient_schema.find({phoneNo:searchValue})
            }
            }
        } else {
            find= await patient_schema.find({})            
        }
        const countemergency = await patient_schema.countDocuments({emergency: true});
        res.status(200).send({status:true,message:"all patient", data:find, countemergency})   
    } catch (error) {
        res.status(400).send("something went wrong !!")
    }
    
}


// const count = await patient_schema.countDocuments();


const create_patient= async(req,res)=>{
    console.log(req.body);
    try {
        const create= new patient_schema({...req.body})
        const result= await create.save()
        res.status(200).send({status:true, message:"paitent created", result})
    } catch (error) {
        res.status(400).send("something went wrong !!")      
    }
}

const createadmin= async(req,res)=>{
    console.log("body=>",req.body);
    try {
        let hidePassword= await bcrypt.hash(req.body.password,12)
        const create= new admin_schema({...req.body,password:hidePassword})
        const result= await create.save()
        res.status(200).send({status:true, message:"paitent created", result})
    } catch (error) {
        console.log("error=>",error);
        res.status(400).send("something went wrong !!")      
    }
}

const loginAdmin = async(req,res)=>{
    try {
        
      console.log("body",req.body);
    //   let findOne=await  admin_schema.findOne({email:req.body.email,password:req.body.password})
      let findOne=await  admin_schema.findOne({email:req.body.email})

      if(!findOne){
        res.status(404).send({status:false, message:"user not found !"})
        return 
      }
      let comparePassword = bcrypt.compare(req.body.password,findOne.password)

      if(!comparePassword){
        res.status(404).send({status:false, message:"password not match !"})
        return 
      }

      if (comparePassword) {
        res.status(200).send({status:true, message:"logIn successfully", data:findOne})
      
      } else {
        res.status(202).send({status:false, message:"Invalid E-mail or Phone Number"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({message:"something went wrong"})
    }
    }

const updatepatient= async (req,res)=>{
    console.log("BODYYYYYYYY",req.body);
    const id= req?.params?.id 
    try {
        const updated= await patient_schema.findByIdAndUpdate(id,{$set:{...req.body}})
        res.status(200).send({status:true, message:"update patient"})
    } catch (error) {
        res.status(400).send("something went wrong !!")      
              
    }
}

const patient_deleted= async(req,res)=>{
    const id= req?.params?.id
    try {
        const deleted= await patient_schema.findByIdAndDelete(id)
        res.status(200).send({status:true, message:"Delete patient"})
    } catch (error) {
        res.status(400).send("something went wrong !!")            
    }
}

//get by id//

const singlePatient= async(req,res)=>{
    try {
        const findById= await patient_schema.findById(req?.params?.id)
        // res.status(200).send({status:true, message:"found patient",findById}) 
        res.send(findById)
    } catch (error) {
        res.status(400).send("something went wrong !!")                    
    }
}

module.exports={getAllPatient,create_patient,patient_deleted,updatepatient,singlePatient,loginAdmin,createadmin}