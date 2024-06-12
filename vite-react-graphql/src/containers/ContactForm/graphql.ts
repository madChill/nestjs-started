import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE_WITH_PHONES = gql`
  mutation AddEmployee($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      firstName
      id
      lastName
      phoneNumber
      email
    }
    status
  }
}

`;
