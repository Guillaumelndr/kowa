import React, { useContext, useState } from 'react'
import { Space, Typography, Button, Tooltip, Popconfirm, Modal } from "antd"

import _ from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DeleteOutlined, StarOutlined, EditOutlined, StarFilled } from '@ant-design/icons'

import { firebaseContext } from '../../context/firebase'
import { clientsContext } from '../../context/clients'

import ClientForm from '../client-form'

const { Text, Link } = Typography

export const columns = [
  {
    title: 'Patient',
    key: 'name',
    render: ({ nom, prenom }) => <Space size={6}><Text strong>{nom.toUpperCase()}</Text><Text>{_.capitalize(prenom)}</Text></Space>
  },
  {
    title: 'Téléphone',
    key: 'name',
    render: ({ tel_dom, tel_port }) => (
      <Space>
        {tel_port && <CopyToClipboard text={tel_port.toString()}><Link href="https://messageriepro3.orange.fr/OFX#mail/SF_INBOX" target="_blank">{tel_port}</Link></CopyToClipboard>}
        {tel_dom && <CopyToClipboard text={tel_dom.toString()}><Link href="https://messageriepro3.orange.fr/OFX#mail/SF_INBOX" target="_blank">{tel_dom}</Link></CopyToClipboard>}
      </Space>

    )
  },
  {
    title: 'Email',
    key: 'name',
    render: ({ mail }) => <Link href={`mailto:${mail.replace(';', '')}`}><Text strong>{mail}</Text></Link>
  },
  {
    title: 'Actions',
    key: 'actions',
    render: data => {
      const { favoris, id } = data
      const { api } = useContext(firebaseContext)
      const { dispatch, mutate } = useContext(clientsContext)

      const [isFavoris, setIsFavoris] = useState(favoris || false)
      const [openModal, setOpenModal] = useState(false)
      const [loading, setLoading] = useState({
        favoris: false,
        delete: false,
        edit: false,
      })

      const setfavoris = () => {
        setLoading({
          ...loading,
          favoris: true,
        })

        api.setClient(id, { ...data, favoris: !isFavoris })
          .then(() => {
            setIsFavoris(!isFavoris)
            !!isFavoris && mutate()
            setLoading({
              ...loading,
              favoris: false,
            })
          })
      }

      const handleDelete = () => {
        setLoading({
          ...loading,
          delete: true,
        })

        api.deleteClient(id)
          .then(() => {
            setLoading({
              ...loading,
              delete: false,
            })
            dispatch({ type: 'delete-client', payload: { uuid: id } })
          })
      }

      const handleEdit = editData => {
        setLoading({
          ...loading,
          edit: true,
        })

        api.setClient(id, {
          nom: editData.nom,
          prenom: editData.prenom,
          tel_dom: editData?.tel_dom || '',
          tel_port: editData?.tel_port || '',
          mail: editData?.mail || ''
        })
          .then(() => {
            setLoading({
              ...loading,
              edit: false,
            })
            setOpenModal(false)
            mutate()
          })
      }


      const submitbtn = (
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading.edit}>
          Editer
        </Button>
      )

      return (
        <>
          <Space>
            {
              isFavoris
                ? <Button icon={<StarFilled />} style={{ color: '#fad314', borderColor: '#fad314' }} onClick={setfavoris} loading={loading.favoris} />
                : <Tooltip title="Ajouter au favoris" placement="left"><Button icon={<StarOutlined />} onClick={setfavoris} loading={loading.favoris} /></Tooltip>
            }
            <Popconfirm title="êtes-vous sûr de vouloir supprimer ?" okText="Oui" cancelText="Non" onConfirm={handleDelete}>
              <Tooltip title="Supprimer le profil du patient" placement="bottom">
                <Button danger icon={<DeleteOutlined />} loading={loading.delete} />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="Editer le profil du patient" placement="top">
              <Button type="dashed" icon={<EditOutlined />} onClick={() => setOpenModal(true)} />
            </Tooltip>
          </Space >
          <Modal
            visible={openModal}
            onCancel={() => setOpenModal(false)}
            title="Editer un patient."
            footer={false}
          >
            <ClientForm submitButton={submitbtn} onFinish={handleEdit} initialValues={data} />
          </Modal>
        </>
      )
    }
  }
]