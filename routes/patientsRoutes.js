const express = require('express');
const router = express.Router();
const patients = require('../models/patientSchema');

// 1
// ***********************************************************************
//API TO GET ALL PATIENTS RECORD
router.get('/', async (req, res) => {
    try {
        const patient = await patients.find(); 
        res.send(patient);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// ***********************************************************************


// 2
// ***********************************************************************
//API TO GET SPECIFIC PATIENT'S RECORD
router.get('/:phone', async (req, res) => {
    try {
        const phone = req.params.phone;
        const patient = await patients.findOne({ phone:phone }); 

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.send(patient);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// ***********************************************************************


// 3
// ***********************************************************************
//API TO REGISTER A PATIENT IN THE DATABASE
router.post('/', (req, res) => {

    const Patient = new patients({
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        address: req.body.address,
        reports: []
    });

    try {
        
        const addPatient = Patient.save();
        res.status(201).json(addPatient);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
// ***********************************************************************


// 4
// ***********************************************************************
//API FOR PATIENT TO INSERT THEIR PRESCRIPTION TO DATABASE
router.patch('/:phone/addReports', async (req, res) => {
    const { phone } = req.params;
    const { reports } = req.body;
  
    try {
      const patient = await patients.findOne({ phone: phone });
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      patient.reports.push(...reports);
      const updatedPatient = await patient.save();
  
      res.json(updatedPatient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  // ***********************************************************************
  
  

module.exports=router;