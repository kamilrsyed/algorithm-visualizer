import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Canvas from './pages/Canvas'
import Sidebar from './components/Sidebar'
import type { AlgoOption } from './interfaces/AlgoOption'

export const algorithms: AlgoOption[] = [
  { id: 0, name: 'Select', code: 'Select', unavailable: false },
  { id: 1, name: 'Bubble Sort', code: 'BUBBLE', unavailable: false },
  { id: 2, name: 'Selection Sort', code: 'SELECTION', unavailable: false },
  { id: 3, name: 'Insertion Sort', code: 'INSERTION', unavailable: false },
  { id: 4, name: 'Merge Sort', code: 'MERGE', unavailable: true },
  { id: 5, name: 'Quick Sort', code: 'QUICK', unavailable: true },
  { id: 6, name: 'Heap Sort', code: 'HEAP', unavailable: true },
]

interface SampleChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

function App() {
  const [sampleVal, setSampleVal] = useState(1);
  const [sortTrigger, setSortTrigger] = useState(0);
  const [generateTrigger, setGenerateTrigger] = useState(0);
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoOption>(algorithms[0]);

  const handleSampleChange = (event: SampleChangeEvent): void => {
    setSampleVal(Number(event.target.value));
  }

  const handleAlgoChange = (selected: AlgoOption): void => {
    setSelectedAlgo(selected);
  }

  const handleRunSort = () => setSortTrigger(t => t + 1);

  const handleGenerate = () => setGenerateTrigger(t => t + 1);

  return (
    <>
      <Header />
      <Sidebar
        onSampleChange={handleSampleChange}
        sampleValue={sampleVal}
        onRunSort={handleRunSort}
        onGenerateArray={handleGenerate}
        onSelectAlgorithm={handleAlgoChange}
        selectedAlgorithm={selectedAlgo}
        algos={algorithms}
      />
      <Canvas
        sortTrigger={sortTrigger}
        sampleValue={sampleVal}
        generateTrigger={generateTrigger}
        selectedAlgorithm={selectedAlgo}
      />
    </>
  )
}

export default App
