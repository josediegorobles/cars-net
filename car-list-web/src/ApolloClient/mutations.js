import { gql } from '@apollo/client';

export const ADD_CAR = gql`
  mutation AddCar($input: AddCarInput!)  {
    addCar(input: $input) {
      data {
        id
      }
    }
  }
`;

export const EDIT_CAR = gql`
  mutation EditCar($input: EditCarInput!) {
    editCar(input: $input) {
      id
      bastidor
    }
  }
`;


export const DELETE_CAR = gql`
  mutation DeleteCar($input: DeleteCarInput!) {
    deleteCar(input: $input) {
      id
      bastidor
    }
  }
`;