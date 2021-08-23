import { Layout, Form, Input, Button } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { useLocation, useHistory, Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export function Edit() {
    const history = useHistory();
    const axios = require('axios');
    const { state } = useLocation();
    var car;
    if(state)
      car = state.car;


    

    const onFinish = (values) => {
        console.log('Success:', values);

        if(!car) {
            axios({
              url: 'http://localhost:5000/graphql',
              method: 'post',
              data: {
               query: `mutation{
                addCar(input: { bastidor: "${values.bastidor}", 
                , modelo: "${values.modelo}",
                matricula: "${values.matricula}", fechaEntrega: "${values.fechaEntrega}" }) {
                  data {
                    id
                  }
                }
               }`
              }
             })
              .then(res => {
               console.log(res.data);
               history.push('/');
              })
              .catch(err => {
               console.log(err.message);
              });
        } else {
          axios({
            url: 'http://localhost:5000/graphql',
            method: 'post',
            data: {
             query: `mutation{
              editCar(input: {id: ${car.id}, bastidor: "${values.bastidor}", 
              , modelo: "${values.modelo}",
              matricula: "${values.matricula}", fechaEntrega: "${values.fechaEntrega}" }) {
                data {
                  id
                }
              }
             }`
            }
           })
            .then(res => {
             console.log(res.data);
             history.push('/');
            })
            .catch(err => {
             console.log(err.message);
            });
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <Layout>
    <Header><Link to={`/`}>
      <Button type="primary" icon={<BankOutlined />} size={'large'} >
      </Button></Link>
    </Header>
    <Layout>
      <Content style={{ padding: '30px 30px' }}>
        <Form 
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={car}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Bastidor"
            name="bastidor"
            rules={[
              {
                required: true,
                message: 'Introduce el número de bastidor',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Modelo"
            name="modelo"
            rules={[
              {
                required: true,
                message: 'Introduce el modelo de coche',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Matricula"
            name="matricula"
            rules={[
              {
                required: true,
                message: 'Introduce la matricula',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha de entrega"
            name="fechaEntrega"
            rules={[
              {
                required: true,
                message: 'Introduce la fecha de entrega',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              { //Check if message failed
                (car)
                  ? "Actualizar" 
                  : "Crear" 
              }
            </Button>
          </Form.Item>
        </Form>
            </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
  )
}