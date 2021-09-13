const { ApolloServer, gql } = require("apollo-server");
const { default: axios } = require("axios");

const typeDefs = gql`
    type Query {
        batch: [Batch]
    }

    type Batch {
        _id: ID
        name: String
        phase: String
    }
`;

const resolvers = {
    Query: {
        batch: () => {
            return axios({
                url: "http://localhost:3003/batch",
                method: "GET",
            }).then(({ data }) => data.body.batch);
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
