import React, { useContext, useEffect, useState } from 'react'
import { firebaseContext } from '../../context/firebase'
import Loader from '../loader'
import { Button, Table } from 'antd'
import { columns } from './columns'

const ClientsList = () => {
  const pageSize = 200
  const [clients, setClients] = useState(null)
  const [latestDoc, setLatestDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [eof, setEof] = useState(false)
  const { api } = useContext(firebaseContext)

  const getNextPage = () => {
    if (eof) return
    setLoading(true)
    api.clients()
      .orderBy('nom')
      .startAfter(latestDoc || 0)
      .limit(pageSize)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          setEof(true)
          return
        }
        const query = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setClients(clients?.concat(query) || query)
        setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
        setLoading(false)
      })
  }

  useEffect(() => {
    !clients && getNextPage()
  }, [])

  return (
    <>
      {
        clients
          ? <Table columns={columns} dataSource={clients} loading={loading} rowKey="id" size="small" />
          : <Loader />
      }
    </>
  )
}

export default ClientsList