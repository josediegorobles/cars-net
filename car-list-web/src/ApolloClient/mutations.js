import { gql } from '@apollo/client';

export const ADD_CAR = gql`
  mutation AddCar($input: String!) {
    addCar(input: $input) {
      id
      bastidor
    }
  }
`;

export const EDIT_CAR = gql`
  mutation AddCar($text: String!) {
    editCar(input: $input) {
      id
      bastidor
    }
  }
`;


export const DELETE_CAR = gql`
  mutation DeleteCar($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;