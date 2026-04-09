import { useState } from 'react'
import CandlestickChart from './components/CandlestickChart'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>DSE Candlestick Chart</h1>
      <CandlestickChart stock="ACI" />
    </div>
  )
}

export default App
