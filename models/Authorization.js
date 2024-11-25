// backend/models/AuthorizationRequest.js
const mongoose = require('mongoose');

const authorizationRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  treatmentType: { type: String, required: true },
  insurancePlan: { type: String, required: true },
  dateOfService: { type: Date, required: true },
  diagnosisCode: { type: String, required: true },
  doctorNotes: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Authorization', authorizationRequestSchema);
