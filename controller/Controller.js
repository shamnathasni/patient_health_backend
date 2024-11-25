const Authorization= require('../models/Authorization');
const Patients = require('../models/Patients');
const Form = require('../models/form');
const jwt = require("jsonwebtoken")
require('dotenv').config(); 


exports.postRegister = async (req, res) =>{
    try {
        const { registerId } = req.body
        const token = jwt.sign({ registerId }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        console.log(error.message);
        
    }
}
exports.postSubmitForm = async (req, res) =>{
    try {
        const { name,email } = req.body
        const newForm = new Form({name,email})
        const form = await newForm.save()
         res.status(200).json({form,alert:"form submitted"})

    } catch (error) {
        console.log(error.message);
        
    }
}

exports.getPatientsList = async (req, res) => {
  try {
    
    console.log('Endpoint hit');
    const patientsList = await Patients.find({});
    console.log(patientsList, "patientsList");

    res.json(patientsList);
  } catch (error) {
    console.error('Error fetching patients:', error); // Log the error if any
    res.status(500).json({ error: error.message });
  }
};

exports.getSingleData = async (req, res) => {
    try {
      const { id } = req.params; // Get patient id from request params
      
      const patient = await Patients.findOne({_id:id}); // Find the patient by ID
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json({ patient });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
  };

exports.getAuthData = async (req, res) => {
    try {
      const { id } = req.params; // Get patient id from request params
      console.log(id,11);
      
      const authData = await Authorization.findOne({patientId:id}); // Find the patient by ID
      if (!authData) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json({ authData });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
  };


  exports.postAutorization = async (req, res) => {
    try {
      const { treatmentType, insurancePlan, dateOfService, diagnosisCode ,doctorNotes} = req.body;
      const { id } = req.params;
  
      console.log(req.body, "bb");  // Log request body
      console.log(req.params, "pp"); // Log request params
  
      const newRequest = new Authorization({ patientId:id, treatmentType, insurancePlan, dateOfService, diagnosisCode, doctorNotes });
      const request = await newRequest.save();
      console.log(request, "newRequest"); // Log new authorization request
  
    //   Update patient authorization
      const authorizePatient = await Patients.updateOne(
        { _id: id },
        { isAuthorized: true } // Set isAuthorized to true
      );
  
      console.log(authorizePatient, "authorizePatient"); // Log the result of the update
  
    //   Check if the update was successful
    res.json({alert:"requst submitted",request})
  
    } catch (error) {
        console.error('Error fetching patients:', error); // Log the error if any
        res.status(500).json({ error: error.message });    }
  };
  
