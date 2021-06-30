import React from 'react'
import { Space, Typography } from "antd"
import _ from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
  }
]