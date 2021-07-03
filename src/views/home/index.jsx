import React, { useContext, useState } from 'react'
import { firebaseContext } from '../../context/firebase'

import ClientsList from '../../components/clients-list'
import Filters from '../../components/filters'
import AddClient from '../../components/add-client'

import { Col, Row } from 'antd'

const Home = () => {
  const { api } = useContext(firebaseContext)
  const [query, setQuery] = useState({
    q: null,
    type: 'patient',
    favoris: false,
  })

  return (
    <div className="container">
      <Row gutter={[16, 16]} justify="space-between" style={{ padding: 16 }}>
        <Col>
          <Filters
            onSearch={q => setQuery({ ...query, q })}
            onTypeChange={type => setQuery({ ...query, type })}
            onSwitchChange={favoris => setQuery({ ...query, favoris })}
          />
        </Col>
        <Col>
          <AddClient />
        </Col>
      </Row>
      <ClientsList query={query} fav={query.favoris} />
    </div>
  )
}

export default Home