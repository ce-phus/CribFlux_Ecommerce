import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Index, CategoryDetail, ProductDetail, DetailProduct, CartUI } from './pages'
import { HelmetProvider } from "react-helmet-async"
import { Navbar } from './components'
import {Footer} from './components'

function App() {


  return (
  <HelmetProvider>
    <Router>
      <div className='bg-[#0E0C15]'>
      <Navbar />  
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/:slug/" element={<CategoryDetail />} />
        <Route path="/product/:category_slug/:slug/" element={<ProductDetail />} />
        <Route path='/product/:slug/' element={<DetailProduct />} />
        <Route path='/cart' element={<CartUI />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  </HelmetProvider>
  )
}

export default App
