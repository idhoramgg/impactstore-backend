const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productImageSchema = new Schema({
    id_product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'products'
    },
    url_image: {
        type: String,
        required: true
    }
}, {timestamps: true})

const ProductImages = mongoose.model('product_images', productImageSchema);

module.exports = ProductImages;