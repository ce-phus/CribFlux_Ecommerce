import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Index } from './pages'
import { HelmetProvider } from "react-helmet-async"
import { Navbar } from './components'

function App() {


  return (
  <HelmetProvider>
    <Router>
      <div className='bg-[#0E0C15]'>
      <Navbar />  
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      </div>
    </Router>
  </HelmetProvider>
  )
}

export default App
