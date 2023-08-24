const express = require('express')
const router = express.Router();
const Doc = require('../models/doctorSchema');
const patients = require('../models/patientSchema');

// 1
// ***********************************************************************
//API TO GET ALL DOCTORS RECORD
router.get('/', async(req, res) => {
    try {
        const doctors = await Doc.find(); 
        res.send(doctors);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// ***********************************************************************

// 2
// ***********************************************************************
// API TO GET A SPECIFIC DOCTOR BY PHONE NUMBER
router.get('/:phone', async (req, res) => {
  try {
    const phone = req.params.phone;
    const doctor = await Doc.findOne({ phone: phone });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.send(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ***********************************************************************


// 3
// ***********************************************************************
//API TO REGISTER A DOCTOR IN THE DATABASE
router.post('/', async (req, res) => {
  const doc = new Doc({
    name: req.body.name,
    qualification: req.body.qualification,
    regNumber: req.body.regNumber,
    hospitalName: req.body.hospitalName,
    hospitalAdr: req.body.hospitalAdr,
    phone: req.body.phone,
    patientData: []
  });

  try {
    const addDoctor = await doc.save();
    res.status(201).json(addDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// ***********************************************************************



// 4
// ***********************************************************************
//API TO UPDATE DOCTOR'S PATIENT DATA ARRAY WHENEVER A PATIENT IS CURED
router.patch('/addPatientsData', async (req, res) => {
  const { phone, patientId, links } = req.body;

  try {
    const doctor = await Doc.findOne({ phone: phone });
    const patient = await patients.findOne({ phone: patientId });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const existingPatientIndex = doctor.patientData.findIndex(
      entry => entry.patientId === patientId
    );

    if (existingPatientIndex !== -1) {
      doctor.patientData[existingPatientIndex].links.push(...links);
    } else {
      doctor.patientData.push({
        patientId: patientId,
        links: links
      });
    }

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.reports.push(...links);
    const updatedPatient = await patient.save();

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ***********************************************************************

  


module.exports = router;