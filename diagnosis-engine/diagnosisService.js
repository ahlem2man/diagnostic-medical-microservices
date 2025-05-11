// diagnosisService.js

function getDiagnosis(symptoms) {
    if (symptoms.includes("fièvre") && symptoms.includes("toux")) {
      return "Grippe";
    } else if (symptoms.includes("fatigue") && symptoms.includes("perte de poids")) {
      return "Diabète";
    } else if (symptoms.includes("maux de tête") && symptoms.includes("fièvre")) {
      return "Covid-19";
    }
    return "Inconnu - consulter un médecin";
  }
  
  module.exports = { getDiagnosis };
  