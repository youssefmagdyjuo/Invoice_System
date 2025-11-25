import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InvoiceForm from './pages/InvoiceForm'
import Layout from './pages/Layout'
import Invoices from './pages/Invoices'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<Layout />}>
            <Route path='/invoiceform' element={<InvoiceForm />} />
            <Route path='/invoices' element={<Invoices />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
