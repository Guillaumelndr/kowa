import React, { useContext, useEffect, useState } from 'react'
import { firebaseContext } from '../../context/firebase'
import Loader from '../loader'
import { Button } from 'antd'

const ClientsList = () => {
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
          ? clients.map(client => <p key={client.id}>{client.nom}</p>)
          : <Loader />
      }
      {!eof && <Button disabled={!clients} onClick={getNextPage} loading={loading}>Load More</Button>}

    </>
  )
}

export default ClientsList