import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'antd'
import { columns } from './columns'
import _ from 'lodash'

import { clientsContext } from '../../context/clients'

const clientFilters = (clients, query) => {
  const filter = _.filter(clients, client => {
    if (query.q === null || query.q === '') return true
    const compare = key => _.includes(client[key]?.toLowerCase(), query.q.toLowerCase())
    if (query.type === 'email') return compare('mail')
    if (query.type === 'téléphone') return compare('tel_dom') || compare('tel_port')
    return compare('nom') || compare('prenom')
  })
  return query.favoris ? _.filter(filter, client => !!client?.favoris === query.favoris) : filter
}

const ClientsList = ({ query, fav }) => {

  const { state: { clients }, mutate, loading } = useContext(clientsContext)

  useEffect(() => {
    fav && mutate()
  }, [fav])
  return (
    <Table
      columns={columns}
      dataSource={clientFilters(clients, query)}
      loading={loading}
      rowKey="id"
      size="small"
      style={{ padding: 16 }}
    />
  )
}

export default ClientsList