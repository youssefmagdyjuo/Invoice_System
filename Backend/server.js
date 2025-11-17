require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/invoiceRoutes')
// const cors = require('cors');

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use('/api/invoices',router)
//Connect Database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected');
        //Running Server
        app.listen(5000, () => {
            console.log('server is listening on port 5000....')
        })
    })
    .catch((err) => {
        console.log(err);
    })
