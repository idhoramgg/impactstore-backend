const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    id_product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    id_cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    status_transactions: {
        type: Boolean
    },
    total_price: {
        type: Number
    }
})
const Transactions = mongoose.model('transactions', transactionsSchema);

module.exports = Transactions