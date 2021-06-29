import React, { useContext } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { firebaseContext } from '../../context/firebase'

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const { user } = useContext(firebaseContext)
  const { state } = useLocation()
  const authenticatedByLocation = state?.authenticated

  return (
    <Route
      {...props}
      render={routeProps =>
        (!!user.authenticated || authenticatedByLocation) ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute