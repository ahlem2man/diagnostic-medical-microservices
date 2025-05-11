const axios = require('axios');

module.exports = {
  Query: {
    recommendations: async (_, { diagnosis }) => {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            query($diag: String!) {
              recommendations(diagnosis: $diag)
            }
          `,
          variables: { diag: diagnosis }
        });

        const data = response.data?.data?.recommendations;

        if (!data) throw new Error('Recommandations manquantes');
        return data;
      } catch (error) {
        console.error(" Erreur dans recommend GraphQL:", error.message);
        throw new Error('Échec de la recommandation');
      }
    }
  },

  Mutation: {
    diagnose: async (_, { symptoms }) => {
      try {
        const response = await axios.post('http://localhost:3001/symptoms', { symptoms });

        const result = response.data?.data?.diagnosis?.result;

        if (!result) throw new Error('Diagnosis result missing');
        const recos = await axios.post('http://localhost:4000/graphql', {
        query: `
          query($diag: String!) {
            recommendations(diagnosis: $diag)
          }
        `,
        variables: { diag: result }
      });

        return {
          symptoms: response.data.data.symptoms,
          diagnosis: result,
          recommendations: recos.data.data.recommendations
        };
      } catch (error) {
        console.error(" Erreur dans diagnose GraphQL:", error.message);
        throw new Error('Échec du diagnostic complet');
      }
    }
  }
};
