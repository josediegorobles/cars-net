import {GET_CARS} from '../ApolloClient/queries'
import { useQuery } from '@apollo/client';
import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

export function Cars() {
    const { loading, error, data } = useQuery(GET_CARS);
   console.log(data);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const { Column } = Table;

    return (
    <div>
      <Table dataSource={data.datas}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Bastidor" dataIndex="bastidor" key="bastidor" />
        <Column title="Modelo" dataIndex="modelo" key="modelo" />
        <Column title="Matricula" dataIndex="matricula" key="matricula" />
        <Column title="Fecha de Entrega" dataIndex="fechaEntrega" key="fechaEntrega" />
        <Column
          title="Action"
          key="action"
          render={(id) => (
            <Space size="middle">
              <Link to={{
                pathname: `/edit/${id}`,
                state: {
                  car: data.datas.find(x => x.id === Number(id))
                },
              }}>Abrir detalle</Link>
              <a>Borrar</a>
            </Space>
          )}
        />
      </Table>
      <Button type="primary">
        <Link to={`/edit`}>Nuevo</Link>
      </Button>
    </div>
    );
  }

  

