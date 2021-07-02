import React, { useContext, useEffect, useState } from 'react'
import { firebaseContext } from '../../context/firebase'
import Loader from '../loader'
import { Button, Table } from 'antd'
import { columns } from './columns'
import _ from 'lodash'

const clientFilters = (clients, query) => {
  console.log(query)
  const filter = _.filter(clients, client => {
    if (query.q === null || query.q === '') return true
    const compare = key => _.includes(client[key]?.toLowerCase(), query.q.toLowerCase())
    if (query.type === 'email') return compare('mail')
    if (query.type === 'téléphone') return compare('tel_dom') || compare('tel_port')
    return compare('nom') || compare('prenom')
  })
  return query.favoris ? _.filter(filter, client => !!client?.favoris === query.favoris) : filter
}

const ClientsList = ({ query }) => {
  // const pageSize = 200
  const [clients, setClients] = useState(null)
  // const [latestDoc, setLatestDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [eof, setEof] = useState(false)
  const { api } = useContext(firebaseContext)

  // index.saveObject(clients)

  const getClient = () => {
    // if (eof) return
    setLoading(true)
    api.clients()
      .orderBy('nom')
      //.startAfter(latestDoc || 0)
      //.limit(pageSize)
      .get()
      .then(querySnapshot => {
        /*
        if (querySnapshot.empty) {
          setEof(true)
          return
        }
        */
        const query = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        // setClients(clients?.concat(query) || query)
        setClients(query)
        // setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
        setLoading(false)
      })
  }

  useEffect(() => {
    getClient()
  }, [query])


  return (
    <Table columns={columns} dataSource={clientFilters(clients, query)} loading={loading} rowKey="id" size="small" />
  )
}

export default ClientsList