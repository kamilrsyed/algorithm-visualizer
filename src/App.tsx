import { useState, type Dispatch, type SetStateAction } from 'react'

import './App.css'
import Header from './components/Header'
import Canvas from './pages/Canvas'
import Sidebar from './components/Sidebar'

interface SampleChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

function App() {
  const [sampleVal, setSampleVal] = useState(1);
  const [sortTrigger, setSortTrigger] = useState(0);
  const [generateTrigger, setGenerateTrigger] = useState(0);

  const handleSampleChange = (event: SampleChangeEvent): void => {
    setSampleVal(Number(event.target.value));
  }

  const handleRunSort = () => setSortTrigger(t => t + 1);

  const handleGenerate = () => setGenerateTrigger(t => t + 1);

  return (
    <>
      <Header  />
      <Sidebar onSampleChange={handleSampleChange} sampleValue={sampleVal} onRunSort={handleRunSort} onGenerateArray={handleGenerate} />
      <Canvas sortTrigger={sortTrigger} sampleValue={sampleVal} generateTrigger={generateTrigger} />
    </>
  )
}

export default App
