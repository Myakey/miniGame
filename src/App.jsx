import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MainMenu from "./routes/MainMenu"
import InGame from "./routes/inGame"
import VN from "./routes/VN"
import './styles/main.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />}/>
        <Route path="/inGame" element={<InGame />}/>
        <Route path="/vn" element={<VN />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
