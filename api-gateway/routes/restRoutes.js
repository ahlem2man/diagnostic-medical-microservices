const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/diagnose', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/symptoms', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get diagnosis' });
  }
});

module.exports = router;
