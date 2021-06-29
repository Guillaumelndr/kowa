import React, { useContext, useState } from 'react'
import { Typography, Row, Col, Form, Input, Button } from 'antd'
const { Title } = Typography
import { firebaseContext } from '../../context/firebase'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const { api } = useContext(firebaseContext)

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const { push } = useHistory()

  const handleSubmit = ({ password }) => {
    setLoading(true)
    api.signIn(password)
      .then(() => push('/', { authenticated: true }))
      .catch(({ message }) => {
        form.setFields([{ name: 'password', errors: [message] }])
        setLoading(false)
      })
  }


  return (
    <div className="center full-page ta-center">
      <Row gutter={16} style={{ maxWidth: 300 }}>
        <Col span={24}><Title>Connexion</Title></Col>
        <Col span={24}><Title level={4}>Se connecter grâce à votre code secret 🔒</Title></Col>
        <Col span={24}>
          <Form layout="vertical" style={{ marginTop: 20 }} onFinish={handleSubmit} form={form}>
            <Form.Item name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                Connexion
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login