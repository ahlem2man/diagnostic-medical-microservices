const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();

  // Start Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

 
  app.use(cors());
  app.use(express.json());  // Utilisation d'express.json() ici

 
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  );

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(` Recommendation GraphQL server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
