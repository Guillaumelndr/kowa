import React, { useContext, useState } from 'react'
import { firebaseContext } from '../../context/firebase'

import ClientsList from '../../components/clients-list'
import Filters from '../../components/filters'
import AddClient from '../../components/add-client'

const Home = () => {
  const { api } = useContext(firebaseContext)
  const [query, setQuery] = useState({
    q: null,
    type: 'patient',
    favoris: false,
  })

  return (
    <>
      <Filters
        onSearch={q => setQuery({ ...query, q })}
        onTypeChange={type => setQuery({ ...query, type })}
        onSwitchChange={favoris => setQuery({ ...query, favoris })}
      />
      <AddClient />
      <ClientsList query={query} />
    </>
  )
}

export default Home