const mongoose = require('mongoose');

const diagnosisLogSchema = new mongoose.Schema({
  symptoms: [String],
  diagnosis: String,
  date: String,
});

module.exports = mongoose.model('DiagnosisLog', diagnosisLogSchema);
