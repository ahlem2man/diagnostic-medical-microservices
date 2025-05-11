const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    recommendations(diagnosis: String!): [String]
  }
`;

module.exports = typeDefs;
