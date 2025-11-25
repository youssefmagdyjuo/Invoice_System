const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({

    date: {
        type: Date,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientAddress: {
        type: {
            country: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true }
        },
        required: true
    },
    draft: {
        type: Boolean,
        required: true,
        default: false
    },
    products: {
        type: [
            {
                product_name: { type: String, required: true },
                product_price: { type: Number, required: true },
                product_total_price: {
                    type: Number,
                    required: true,
                    default: function () {
                        const price = this.product_price * this.count;
                        if (this.descount) {
                            return price - (price * (this.descount / 100));
                        }
                        return price;
                    }
                }
                ,
                count: { type: Number, required: true },
                descount: { type: Number, required: false, min: 0, max: 100 }
            }
        ],
        required: true,
    },
    total_price: {
        type: Number,
    }
},
    {
        timestamps: true
    })

// calc total price for all invoice
invoiceSchema.pre('save', function (next) {
    this.total_price = this.products.reduce((sum, item) => {
        return sum + item.product_total_price;
    }, 0);
    next();
});

const invoiceModel = mongoose.model('invoice', invoiceSchema)
module.exports = invoiceModel