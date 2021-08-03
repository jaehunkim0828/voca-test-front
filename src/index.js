import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { positions, Provider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER
};

ReactDOM.render(
  <CookiesProvider>
    <Provider template={AlertTemplate}  {...options}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
