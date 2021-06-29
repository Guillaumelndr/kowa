import React from 'react'
import { Space, Typography } from "antd"
import _ from 'lodash'

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
        {tel_port && <Link href="https://ant.design" target="_blank">{tel_port}</Link>}
        {tel_dom && <Link href="https://ant.design" target="_blank">{tel_dom}</Link>}
      </Space>

    )
  },
  {
    title: 'Email',
    key: 'name',
    render: ({ nom, prenom }) => <Space size={6}><Text strong>{nom.toUpperCase()}</Text><Text>{_.capitalize(prenom)}</Text></Space>
  }
]