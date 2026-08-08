import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Invoices from './pages/Invoices'
import CreateInvoice from './pages/CreateInvoice'
import DetailsInvoice from './pages/DetailsInvoice'
import HTMLTemplate from './components/PDF/HTMLTemplate'
import GeneratePDF from './components/PDF/GeneratePDF'
import Clients from './pages/Clients'
import ClientDetails from './pages/ClientDetails'
import Settings from './pages/Settings'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/html-templete' element={<HTMLTemplate />} />
          <Route path='/generatePDF' element={<GeneratePDF />} />
          <Route element={<Layout />}>
            <Route path='/settings' element={<Settings />} />
            <Route path='/createInvoice' element={<CreateInvoice />} />
            <Route path='/invoices' element={<Invoices />} />
            <Route path='/invoices/invoiceDetails/:id' element={<DetailsInvoice />} />
            <Route path='/clients' element={<Clients/>}/>
            <Route path='/clients/clientDetails/:id' element={<ClientDetails/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
