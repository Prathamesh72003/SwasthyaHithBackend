const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    regNumber:{
        type: String,
        required: true
    },
    hospitalName:{
        type: String,
        required: true
    },
    hospitalAdr:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    
    
    patientData: [
        {
            patientId: {
                type: String,
            },
            links: [String]
        }
    ]
})

module.exports = mongoose.model('doctorSchema', doctorSchema);