import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Invoices from './pages/Invoices'
import CreateInvoice from './pages/CreateInvoice'
import DetailsInvoice from './pages/DetailsInvoice'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<Layout />}>
            <Route path='/createInvoice' element={<CreateInvoice />} />
            <Route path='/invoices' element={<Invoices />} />
            <Route path='/invoiceDetails/:id' element={<DetailsInvoice/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
