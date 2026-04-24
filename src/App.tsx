import CandlestickChart from './components/CandlestickChart/CandlestickChart'

import StockSelector from './components/StockSelector/StockSelector'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BottomPanel from './components/BottomPanel/BottomPanel'

function App() {
  
  return (
    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  }}
>
  <Header />

  <div>
    <StockSelector />
  </div>

  <Footer />
</div>
  )
}

export default App
