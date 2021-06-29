import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import PrivateRoute from '../components/private-route'
import Loader from '../components/loader'

import { firebaseContext } from '../context/firebase'

import Home from './home'
import Login from './login'

const App = () => {
  const { user: { loading } } = useContext(firebaseContext)
  return (
    loading ? <Loader page /> : (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    )
  )
}

export default App