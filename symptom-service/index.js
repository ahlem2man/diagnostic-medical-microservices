const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const symptomController = require('./controllers/symptomController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Variable pour stocker le dernier diagnostic
let lastDiagnosis = null;

// POST /symptoms (existant)
app.post('/symptoms', async (req, res) => {
  try {
    const result = await symptomController.handleSymptoms(req, res);
    // handleSymptoms gère déjà la réponse
    // mais on peut stocker le résultat ici aussi
    if (res.locals && res.locals.lastDiagnosis) {
      lastDiagnosis = res.locals.lastDiagnosis;
    }
  } catch (error) {
    console.error('Erreur dans POST /symptoms:', error.message);
    res.status(500).json({ error: 'Erreur côté serveur.' });
  }
});


app.get('/symptoms', (req, res) => {
  if (lastDiagnosis) {
    res.json({
      success: true,
      data: lastDiagnosis,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Aucun diagnostic encore effectué.',
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Symptom service running on port ${PORT}`);
});
