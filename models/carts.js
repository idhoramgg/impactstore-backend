const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartsSchema = new Schema({
    id_user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    id_product:{
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status_cart: {
        type: Boolean,
        default: true
    }
})

const Carts = mongoose.model('carts', cartsSchema);

module.exports = Carts;