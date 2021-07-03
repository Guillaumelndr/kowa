import React from 'react'

import { Form, Input, Row, Col } from 'antd'

const ClientForm = ({ submitButton, onFinish, initialValues }) => {

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={{ ...initialValues }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='nom' label="Nom" rules={[{ required: true, message: 'Le nom du patient est obligatoire.' }]}>
            <Input autoComplete='nope' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='prenom' label="Prénom" rules={[{ required: true, message: 'Le prénom du patien est obligatoire.' }]}>
            <Input autoComplete='nope' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='tel_port' label="Téléphone portable">
            <Input autoComplete='nope' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='tel_dom' label="Téléphone domicile">
            <Input autoComplete='nope' />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name='mail' label="Email">
        <Input autoComplete='nope' />
      </Form.Item>
      <Form.Item style={{ width: '100%' }}>
        {submitButton}
      </Form.Item>
    </Form>
  )
}

export default ClientForm