import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'


axios.defaults.baseURL = process.env.REACT_APP_BE_URL; 

if(process.env.NODE_ENV === 'production') disableReactDevTools();
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <BrowserRouter>
    
        <App />
     
    </BrowserRouter>
  </React.StrictMode>
);

  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 
