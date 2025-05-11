const grpcClient = require('../services/grpcClient');

exports.handleSymptoms = async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({
      error: true,
      message: 'Invalid symptoms format. Expected an array of strings.'
    });
  }

  try {
    const diagnosis = await grpcClient.getDiagnosis(symptoms);

    // ⬅️ Enregistrement temporaire pour GET /symptoms
    res.locals.lastDiagnosis = {
      symptoms,
      diagnosis,
    };

    res.status(200).json({
      success: true,
      data: {
        symptoms,
        diagnosis
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(' Error while getting diagnosis:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to get diagnosis. Please try again later.'
    });
  }
};
