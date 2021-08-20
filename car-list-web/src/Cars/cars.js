import {GET_CARS} from '../ApolloClient/queries'
import { useQuery } from '@apollo/client';

export function Cars({ onDogSelected }) {
    const { loading, error, data } = useQuery(GET_CARS);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
    return (
      <select name="dog" onChange={onDogSelected}>
        {data.datas.map(car => (
          <option key={car.id} value={car.bastidor}>
            {car.bastidor}
          </option>
        ))}
      </select>
    );
  }