import React, { useContext, useState } from 'react'
import { Space, Typography, Button, Tooltip } from "antd"
import _ from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DeleteOutlined, StarOutlined, EditOutlined, StarFilled } from '@ant-design/icons'
import { firebaseContext } from '../../context/firebase'
const { Text, Link } = Typography

export const columns = [
  {
    title: 'Patient',
    key: 'name',
    render: ({ nom, prenom }) => <Space size={6}><Text strong>{nom.toUpperCase()}</Text><Text>{_.capitalize(prenom)}</Text></Space>
  },
  {
    title: 'Télépone',
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

      const [isFavoris, setIsFavoris] = useState(favoris || false)
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
            setLoading({
              ...loading,
              favoris: false,
            })
          })
      }

      return (
        <Space>
          {
            isFavoris
              ? <Button icon={<StarFilled />} style={{ color: '#fad314', borderColor: '#fad314' }} onClick={setfavoris} loading={loading.favoris} />
              : <Tooltip title="Ajouter au favoris" placement="left"><Button icon={<StarOutlined />} onClick={setfavoris} loading={loading.favoris} /></Tooltip>
          }
          <Tooltip title="Supprimer le profil du patient" placement="bottom"><Button danger icon={<DeleteOutlined />} loading={loading.delete} /></Tooltip>
          <Tooltip title="Editer le profil du patient" placement="top"><Button type="dashed" icon={<EditOutlined />} loading={loading.edit} /></Tooltip>
        </Space >
      )
    }
  }
]