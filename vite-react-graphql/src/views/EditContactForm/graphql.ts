import { gql } from "@apollo/client";

export const FETCH_CONTACT_BY_ID = gql`
  query Employees($id: Int!) {
    getEmployee(id: $id) {
        id
        email
        firstName
        lastName
        phoneNumber
    }
}
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateEmployee($input: UpdateUserInput!) {
  updateUser(input: $input) {
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