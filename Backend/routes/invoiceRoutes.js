const express = require('express')
const router = express.Router()
const { getInvoices, ADDInvoice, editInvoice, deleteInvoice ,getSpecificInvoice,generatePDF} = require('../controllers/functions')


router.route('/').get(getInvoices).post(ADDInvoice)

router.route('/:id').get(getSpecificInvoice).put(editInvoice).delete(deleteInvoice)

router.route('/generate-pdf').post(generatePDF)
module.exports = router