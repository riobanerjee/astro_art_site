import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MenuBar from './components/Navbar';
import HomePage from './pages/Home';
import ResultsPage from './pages/Results';

function App() {

  const apiRoute = 'test';

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage apiRoute={apiRoute} />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App


