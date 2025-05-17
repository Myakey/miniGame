import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MainMenu from "./routes/MainMenu"
import InGame from "./routes/inGame"
import VN from "./routes/VN"
import CharSel from './routes/charaSel'
import LoadingScreen from './components/loadingScreen'
import './styles/main.css'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
    {loaded ? (
      <LoadingScreen onLoaded={() => setLoaded(true)} />
    ) : (
      <Routes>
        <Route path="/" element={<MainMenu />}/>
        <Route path="/inGame" element={<InGame />}/>
        <Route path="/vn" element={<VN />}/>
        <Route path="/charaSel" element={<CharSel />}/>
      </Routes>
      )}
    </BrowserRouter>
  )
}

export default App;
