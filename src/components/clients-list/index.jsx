import React, { useContext, useEffect, useState } from 'react'
import { firebaseContext } from '../../context/firebase'
import Loader from '../loader'
import { Button } from 'antd'

const ClientsList = () => {
  const pageSize = 1
  const [clients, setClients] = useState(null)
  const [latestDoc, setLatestDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const { api } = useContext(firebaseContext)

  const getNextPage = () => {
    setLoading(true)
    api.clients()
      .orderBy('nom')
      .startAfter(latestDoc || 0)
      .limit(pageSize)
      .get()
      .then(querySnapshot => {
        setClients(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
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
          ? clients.map(client => <p key={client.id}>{client.nom}</p>)
          : <Loader />
      }
      <Button disabled={!clients} onClick={getNextPage} loading={loading}>Load More</Button>
    </>
  )
}

export default ClientsList