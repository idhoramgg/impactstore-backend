const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productsSchema = new Schema({
    product_name: {
        type: String
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "product_images"
    }]
}, {timestamps: true})

const Products = mongoose.model('products', productsSchema)

module.exports = Products