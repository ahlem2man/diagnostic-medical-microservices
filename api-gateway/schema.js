const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    recommendations(diagnosis: String!): [String]
  }
type DiagnosisFullResponse {
  symptoms: [String!]!
  diagnosis: String!
  recommendations: [String!]!
}

type Mutation {
  diagnose(symptoms: [String!]!): DiagnosisFullResponse!
}

`;
