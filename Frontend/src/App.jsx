import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InvoiceForm from './pages/InvoiceForm'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/invoiceform' element={<InvoiceForm/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
