import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query GetCars {
    datas
    {
        id
        bastidor
        modelo
        matricula
        fechaEntrega
    }
  }
`;