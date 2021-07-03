import React, { useContext, useState } from 'react'
import { firebaseContext } from '../../context/firebase'

import ClientsList from '../../components/clients-list'
import Filters from '../../components/filters'
import AddClient from '../../components/add-client'

import { Col, Row, Button } from 'antd'
import { css } from '@emotion/css'

const Home = () => {
  const { api } = useContext(firebaseContext)
  const [query, setQuery] = useState({
    q: null,
    type: 'patient',
    favoris: false,
  })

  return (
    <>
      <nav className={css`background: white; padding: 16px; box-shadow: 0px -8px 20px 0pt #d1d1d1;`}>
        <Row justify="space-between" gutter={[16, 16]} align="middle">
          <Col style={{ fontSize: 20 }}>Dr <b>Kowalewski</b></Col>
          <Col>
            <Button type="dashed" onClick={() => api.signOut()}>
              Déconnexion
            </Button>
          </Col>
        </Row>
      </nav>
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
    </>
  )
}

export default Home