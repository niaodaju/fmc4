import React, { useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import MRoute from './router/rindex'
import { HashRouter, Route, Routes } from 'react-router-dom'
import store from './redux/store'
import fm from './constants/common'

function App() {
  useEffect(() => {
    axios.defaults.baseURL = fm.HTTP
    axios.interceptors.request.use(
      config => {
        console.log("axios init is called")
        config.headers["Content-Type"] = 'application/json'
        // return Promise.reject("");
        return config;
      },
      err=> {
        return Promise.reject(err);
      })
    store.subscribe(() => {
      console.log("app 中订阅")
    })
  }, [])
  return (
    <HashRouter>
      <MRoute></MRoute>
    </HashRouter>
  )
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
