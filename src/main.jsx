import React from 'react'
import ReactDOM from 'react-dom'
import App from './views'

import 'antd/dist/antd.css'
import './main.less'

import { FirebaseProvider } from './context/firebase'
import { ClientsProvider } from './context/clients'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <ClientsProvider>
        <App />
      </ClientsProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
)