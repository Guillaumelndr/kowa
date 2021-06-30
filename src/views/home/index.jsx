import React, { useContext, useState } from 'react'
import { firebaseContext } from '../../context/firebase'
import ClientsList from '../../components/clients-list'
import Filters from '../../components/filters'

const Home = () => {
  const { api } = useContext(firebaseContext)
  const [query, setQuery] = useState({
    q: null,
    type: 'patient',
  })

  return (
    <>
      <Filters onSearch={setQuery} onTypeChange={type => setQuery({ ...query, type })} />
      <ClientsList query={query} />
    </>
  )
}

export default Home