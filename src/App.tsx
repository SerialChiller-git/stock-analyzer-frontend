

import StockSelector from './components/StockSelector/StockSelector'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

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
