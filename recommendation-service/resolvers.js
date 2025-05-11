const data = require('./data');

const resolvers = {
  Query: {
    recommendations: (_, { diagnosis }) => {
      return data[diagnosis] || ["Aucune recommandation disponible"];
    }
  }
};

module.exports = resolvers;
