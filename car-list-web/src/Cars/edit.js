import { Form, Input, Button } from 'antd';
import {GET_CARS} from '../ApolloClient/queries'
import {ADD_CAR, EDIT_CAR} from '../ApolloClient/mutations'
import { useMutation, useQuery } from '@apollo/client';

import React from 'react'

export function Edit(props) {
    const { id } = props.match.params;
    const { loading, error, data } = useQuery(GET_CARS);
    const {addCar} = useMutation(ADD_CAR);
    const {editCar} = useMutation(EDIT_CAR);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const onFinish = (values) => {
        console.log('Success:', values);
        if(notCar) 
            addCar({variables: {car: values }});
        else
            editCar({variables: {car: values }});
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
    const car = data.datas.find(x => x.id === Number(id));
    var notCar = false;
    if(id==null)
      notCar = true;
    console.log(notCar);

  return (
      <Form 
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
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
            message: 'Please input your username!',
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
            message: 'Please input your password!',
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
            message: 'Please input your username!',
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
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  )
}