import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from './axios';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

axiosInstance.interceptors.request.use(
  request =>{
    let basicToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjcmlzdGkiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjg1NTM3NTcxLCJleHAiOjE2ODU2MjM5NzF9.w2ZYGdC1JPi5bx_mPJdUA1Y2n94EGMUKUTRe_tpJMJs";
    if(basicToken){
      request.headers['Authorization'] = basicToken;
    }
    //alert(request.headers);
    return request;
  },
  error => {
    return Promise.reject(error);
  }
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
