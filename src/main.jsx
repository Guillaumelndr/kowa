import React from 'react'
import ReactDOM from 'react-dom'
import App from './views'
import 'antd/dist/antd.css'
import './main.less'
import {FirebaseProvider} from './context/firebase'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <App /> 
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
)