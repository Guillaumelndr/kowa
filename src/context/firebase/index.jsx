import React, { createContext, useEffect, useReducer, useState } from 'react'
import firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"

const firebaseContext = createContext({})
const { Provider } = firebaseContext

const config = {
  apiKey: "AIzaSyAMBJfwJ0Fk4MvQwyu-Tay23ha6Xxxb4Pg",
  authDomain: "app-contact-1beb4.firebaseapp.com",
  databaseURL: "https://app-contact-1beb4.firebaseio.com",
  projectId: "app-contact-1beb4",
  storageBucket: "app-contact-1beb4.appspot.com",
  messagingSenderId: "264231661360",
  appId: "1:264231661360:web:c1bce30a116574a265a2f5",
  measurementId: "G-YL9RJYXBCH"
}

firebase.initializeApp(config)
const db = firebase.firestore()

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState({
    authenticated: false,
    loading: true,
  })
  const email = 'guillaumelandre101@gmail.com'
  const api = {
    signIn: (password) => firebase.auth().signInWithEmailAndPassword(email, password),
    signOut: () => firebase.auth().signOut(),
    getUserToken: () => firebase.auth().currentUser.getIdToken(),
    clients: () => db.collection("clients")
  }


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({
          authenticated: true,
          loading: false,
        })
      } else {
        setUser({
          authenticated: false,
          loading: false,
        })
      }
    })
  }, [])

  return (
    <Provider value={{ api, user }}>
      {children}
    </Provider>
  )
}

export { firebaseContext, FirebaseProvider }