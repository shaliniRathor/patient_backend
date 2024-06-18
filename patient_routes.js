const express= require("express")
const router= express.Router()
const {getAllPatient,create_patient,updatepatient,patient_deleted,singlePatient,loginAdmin,createadmin}= require('./patient_controllers')

router.get('/get/all/patient',getAllPatient)
router.get('/get/single/patient/:id',singlePatient)
router.post('/logIn/patient/',loginAdmin)
router.post('/signUP/patient/',createadmin)
router.post('/create/patient',create_patient)
router.patch('/update/pateint/:id',updatepatient)
router.delete('/delete/:id',patient_deleted)

module.exports= router