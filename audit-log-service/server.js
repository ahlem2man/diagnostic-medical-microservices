const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const DiagnosisLog = require('./models/DiagnosisLog');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/diagnosis_logs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/logs', async (req, res) => {
  try {
    const logs = await DiagnosisLog.find().sort({ date: -1 });
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(` Log server running on port ${PORT}`);
});
