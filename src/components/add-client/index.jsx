import React, { useContext, useState } from 'react'
import { Form, Input, Button, Modal, Row, Col } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { firebaseContext } from '../../context/firebase'

import { v4 as uuidv4 } from 'uuid'
import { clientsContext } from '../../context/clients'

const AddClient = () => {
  const { api } = useContext(firebaseContext)
  const { dispatch } = useContext(clientsContext)

  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleSubmit = data => {
    setLoading(true)
    const client = {
      id: uuidv4(),
      data: {
        nom: data.nom,
        prenom: data.prenom,
        tel_dom: data?.tel_dom || '',
        tel_port: data?.tel_port || '',
        mail: data?.mail || ''
      }
    }
    api.setClient(client.id, client.data)
      .then(() => {
        dispatch({ type: 'add-client', payload: { client: { id: client.id, ...client.data } } })
        setLoading(false)
        setOpenModal(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }

  return (
    <>
      <Modal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        title="Ajouter un patient."
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
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
            <Button type="primary" icon={<PlusCircleOutlined />} htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setOpenModal(true)}>Ajouter un patient</Button>
    </>
  )
}

export default AddClient