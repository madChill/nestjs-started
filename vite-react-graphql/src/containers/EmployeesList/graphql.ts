import { gql } from "@apollo/client";

export const DELETE_CONTACT = gql`
    mutation UpdateEmployee($id: Int!) {
    deleteUser(id: $id) 
  }
`;

export const FETCH_EMPLOYEES = gql`
query Employees($input: queryInputEmployees) {
  getEmployees(input: $input) {
    user{
      id
      email
      firstName
      lastName
      phoneNumber
    }
    total
  }
}
`;
