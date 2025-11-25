const invoice = require('../models/invoice')

//GET METHOD
const getInvoices = async (req, res) => {
    try {
        const invoices = await invoice.find({})
        res.status(200).json({
            succsess: true,
            message: 'feth data successfully',
            data: invoices
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const getSpecificInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const catchedInvoice = await invoice.findById(id)
        if (!catchedInvoice) {
            return res.status(404).json({
                success: false,
                message: 'invoice not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'catch specific invoice successfully',
            data: catchedInvoice
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
// POST METHOD 
const ADDInvoice = async (req, res) => {
    try {
        const newInvoice = await invoice.create(req.body);
        res.status(200).json({
            success: true,
            message: 'New invoice added successfully',
            data: newInvoice
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
// PUT METHOD 
const editInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const updatedInvoice = await invoice.findByIdAndUpdate(id, req.body);
        if (!updatedInvoice) {
            return res.status(404).json({
                success: false,
                message: 'invoice not found',
            });
        }
        const updatedInvoiceData = await invoice.findById(id);
        res.status(200).json({
            success: true,
            message: 'invoice updated successfully',
            data: updatedInvoiceData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
// DELETE METHOD 
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const updatedInvoice = await invoice.findByIdAndDelete(id);
        if (!updatedInvoice) {
            return res.status(404).json({
                success: false,
                message: 'invoice not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'invoice deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getInvoices, ADDInvoice, editInvoice, deleteInvoice ,getSpecificInvoice }