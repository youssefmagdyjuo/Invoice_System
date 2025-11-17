const express = require('express')
const router = express.Router()
const { getInvoices, ADDInvoice, editInvoice, deleteInvoice ,getSpecificInvoice} = require('../controllers/functions')


router.route('/').get(getInvoices).post(ADDInvoice)

router.route('/:id').get(getSpecificInvoice).put(editInvoice).delete(deleteInvoice)

module.exports = router