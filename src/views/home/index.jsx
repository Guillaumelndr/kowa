import React, { useContext } from 'react'
import { firebaseContext } from '../../context/firebase'
import ClientsList from '../../components/clients-list'

const Home = () => {
  const { api } = useContext(firebaseContext)

  return (
    <>
      <ClientsList />
    </>
  )
}

export default Home