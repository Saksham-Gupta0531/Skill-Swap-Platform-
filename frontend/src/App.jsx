import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Auth from "./Components/Auth/Auth.jsx";
import Home from "./Components/Home/Home.jsx";
import CardDetail from "./Components/RequestCard/CardDetail.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </Router>
  )
}

export default App
