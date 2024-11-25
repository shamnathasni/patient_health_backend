const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  treatmentPlan: { type: String, required: true },
  isAuthorized:{type:Boolean,default:false}
}, 
// { collection: 'PatientsData' }
);  // Specify collection name if needed

module.exports = mongoose.model('Patient', patientSchema);
