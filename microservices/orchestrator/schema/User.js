const { ApolloServer, gql } = require("apollo-server");
const { default: axios } = require("axios");

const typeDefs = gql`
    type Query {
        users: [User]
        user(id: String): User
    }

    type Mutation {
        addUser(input: InputUser): User
        delUser(id: String): String
    }

    input InputUser {
        name: String
        email: String
    }

    """
    Ini type data untuk user
    """
    type User {
        _id: ID
        name: String
        email: String
    }
`;

const resolvers = {
    Query: {
        users: () => {
            return axios
                .get("http://localhost:3002/users")
                .then(({ data }) => data.body.users);
        },
        user: (_, { id }) => {
            return axios
                .get("http://localhost:3002/users/" + id)
                .then(({ data }) => data.body.users);
        },
    },
    Mutation: {
        addUser: (_, { input }) => {
            return axios
                .post("http://localhost:3002/users", { ...input })
                .then(({ data }) => {
                    return data.body.user;
                });
        },
        delUser: (_, { id }) => {
            return axios
                .delete("http://localhost:3002/users/" + id)
                .then(({ data }) => {
                    return data.body.id;
                });
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
