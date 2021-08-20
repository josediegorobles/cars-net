import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query GetCars {
    datas
    {
        id
        bastidor
    }
  }
`;

const GET_CAR = gql`
  query GetCar($id: int!) {
    datas(where: {id: {eq: $id} })
    {
        id
        bastidor
    }
  }
`;