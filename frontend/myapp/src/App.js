import './App.css';
import './pages/login.js'
import Login from './pages/login.js';
import {Route, Routes} from "react-router-dom";
import Policeman from './pages/policeman';
import Postman from './pages/postman';
import Fines from './pages/fines';
//import {useState} from "react";

function App() {
  return <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/policeman" element={<Policeman/>}/>
    <Route path="/postman" element={<Postman/>}/>
    <Route path="/fines" element={<Fines/>}/>
  </Routes>
}

export default App;
