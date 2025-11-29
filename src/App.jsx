import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Index, CategoryDetail } from './pages'
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
      </Routes>
      </div>
      <Footer />
    </Router>
  </HelmetProvider>
  )
}

export default App
