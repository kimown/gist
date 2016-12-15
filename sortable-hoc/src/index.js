import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



const children=['Swap them around00000','Swap us around111111','Swap things around2222222222','Swap everything around3333333333']
ReactDOM.render(
  <App children={children} />,
  document.getElementById('root')
);
