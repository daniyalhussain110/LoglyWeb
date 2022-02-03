import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { ToastProvider } from 'react-toast-notifications';
import { Transition } from 'react-transition-group'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
      {/* <ToastProvider> */}
        <App /> 
      {/* </ToastProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
