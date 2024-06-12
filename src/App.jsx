import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuroraBackgroundDemo } from './components/childs/background'
import { Chat } from './components/Chat'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import '@fontsource/inter';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='chat' element={<Chat/>} />
      </Routes>
    </>
  )
}

export default App
