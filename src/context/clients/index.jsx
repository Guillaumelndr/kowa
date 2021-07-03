import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { firebaseContext } from '../firebase'

const clientsContext = createContext({})
const { Provider } = clientsContext

const deleteClient = (uuid, state) => {
  return { ...state, clients: state.clients.filter(client => client.id != uuid) }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...action.payload }
    case 'delete-client':
      return deleteClient(action.payload?.uuid, state)
    case 'add-client':
      return { ...state, clients: [...state.clients, action.payload?.client] }
    default:
      throw new Error()
  }
}

const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState(null)
  const [loading, setLoading] = useState(false)
  const { api } = useContext(firebaseContext)

  const [state, dispatch] = useReducer(reducer, { clients })

  const getClient = () => {
    setLoading(true)
    api.clients()
      .orderBy('nom')
      .get()
      .then(querySnapshot => {
        const query = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setClients(query)
        setLoading(false)
      })
  }

  useEffect(() => {
    getClient()
  }, [])

  useEffect(() => {
    clients && dispatch({ type: 'update', payload: { clients } })
  }, [clients])

  const mutate = () => {
    setClients(null)
    getClient()
  }

  return (
    <Provider value={{ state, dispatch, mutate, loading }}>
      {children}
    </Provider>
  )
}

export { clientsContext, ClientsProvider }