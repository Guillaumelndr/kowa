import React, { useContext, useEffect, useState } from 'react'
import { firebaseContext } from '../../context/firebase'
import Loader from '../loader'

const ClientsList = () => {
  const [clients, setClients] = useState(null)
  const { api } = useContext(firebaseContext)

  useEffect(() => {
    !clients && (
      api.getClients()
        .then(querySnapshot => {
          setClients(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    )
  }, [clients])




  console.log(clients)

  return (
    <>
      {
        clients
          ? clients.map(client => <p key={client.id}>{client.nom}</p>)
          : <Loader />
      }
    </>
  )
}

export default ClientsList