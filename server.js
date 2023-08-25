const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); 

app.use(cors());

mongoose.connect('mongodb+srv://swasthyahith:QPVAea3b492EHyRZ@cluster0.xokiszq.mongodb.net/?retryWrites=true&w=majority', {useNewURLParser: true});
const db = mongoose.connection;

db.on('error', (error)=>{console.error(error)});
db.once('open', ()=>{console.log("Connected to the database")});

app.use(express.json());

//For Doctor
const docRouter = require('./routes/doctorsRoute');
app.use('/doctors', docRouter);

// //For Patients
const patientRouter = require('./routes/patientsRoutes');
app.use('/patients', patientRouter);


// //For Feedback
const feedbackRouter = require('./routes/feedbackRoute');
app.use('/feedback', feedbackRouter);


app.listen(3000, () => {
    console.log("Server started!");
});