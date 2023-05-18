import React, { useState } from 'react';
import { Modal, Form, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { authMethod } from '../api/api';
import { login } from '../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

function LoginModal({ show, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await authMethod(email, password);
      if (response.status === 200) {
        dispatch(login());
        message.success('Login successful');
        onClose();
      }
    } catch (error) {
      message.error('Incorrect login or password');
    }

    setLoading(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    handleLogin(values);
  };

  return (
    <Modal open={show} onCancel={onClose} footer={null} title="Login">
      <Spin spinning={loading}>
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default LoginModal;