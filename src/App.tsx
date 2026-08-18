import { useState, type Dispatch, type SetStateAction } from 'react'

import './App.css'
import Header from './components/Header'
import Canvas from './pages/Canvas'
import Sidebar from './components/Sidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

// sidebarOpen={false} setSidebarOpen={handleSidebarOpen()}

  return (
    <>
      <Header  />
      <Sidebar />
      <Canvas />
    </>
  )
}

function handleSidebarOpen(): Dispatch<SetStateAction<boolean>> {
  throw new Error('Function not implemented.')
}

export default App
