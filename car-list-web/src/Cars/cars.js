import {GET_CARS} from '../ApolloClient/queries'
import {client} from '../ApolloClient/client'
import { useQuery } from '@apollo/client';
import { Layout, Table, Space, Button } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export function Cars() {
    const { loading, error, data } = useQuery(GET_CARS);
    useEffect(() => {
      if(data) {
        client.refetchQueries({
          include: "active",
        });
      }
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const { Column } = Table;

    return (
      <Layout>
        <Header>
        </Header>
        <Layout>
          <Content style={{ padding: '30px 30px' }}>
            <Table dataSource={data.datas}>
              <Column title="Id" dataIndex="id" key="id" />
              <Column title="Bastidor" dataIndex="bastidor" key="bastidor" />
              <Column title="Modelo" dataIndex="modelo" key="modelo" />
              <Column title="Matricula" dataIndex="matricula" key="matricula" />
              <Column title="Fecha de Entrega" dataIndex="fechaEntrega" key="fechaEntrega" />
              <Column
                title="Action"
                key="action"
                render={(car) => (
                  <Space size="middle">
                    <Link to={{
                      pathname: `/edit/${car.id}`,
                      state: {
                        car: car
                      },
                    }}>Abrir detalle</Link>
                    <Link onClick={() => {
                          const axios = require('axios');
                      axios({
                        url: 'http://localhost:5000/graphql',
                        method: 'post',
                        data: {
                        query: `mutation{
                          deleteCar(input: { id: ${car.id}}) {
                            data {
                              id
                            }
                          }
                        }`
                        }
                      })
                        .then(res => {
                        console.log(res.data);
                        client.refetchQueries({
                          include: "active",
                        });
                        })
                        .catch(err => {
                        console.log(err.message);
                        });
                    }}>Borrar</Link>
                  </Space>
                )}
              />
            </Table>
            <Button type="primary">
              <Link to={`/edit`}>Nuevo</Link>
            </Button>
            </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    );
  }

  

