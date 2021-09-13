import { gql } from "@apollo/client";

export const FETCH_USER = gql`
    query {
        users {
            name
            email
            _id
        }
    }
`;

export const BLOCKED_USER = gql`
    query BlockedUser {
        blockedUser @client
    }
`;

export const FAVORITE_USER = gql`
    query {
        favUserQuery @client
    }
`;
