const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const routes = require('./routes/restRoutes');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const PORT = 4001;


app.use(cors());
app.use(express.json());  
app.use('/api', routes);
app.use(express.static('public'));

async function startGraphQL() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startGraphQL();

app.listen(PORT, () => {
  console.log(` API Gateway REST: http://localhost:${PORT}/api`);
  console.log(` API Gateway GraphQL: http://localhost:${PORT}/graphql`);
});
