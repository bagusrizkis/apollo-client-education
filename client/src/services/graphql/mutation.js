import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($addUserInput: InputUser) {
        addUser(input: $addUserInput) {
            email
            name
        }
    }
`;
