const Transactions = require('../models/transactions');
const Carts = require('../models/carts');
const Products = require('../models/products');

module.exports = {
    getAll : async (req, res) => {
        try {
            const transactions = await Transactions.find({})
            if(transactions){
               res.status(200).json({
                   message: 'success get all data',
                   transactions
               })
            }
        }
        catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'internal server error'
            })
        }
    },
    getOne: async (req, res) => {
        try {
            const transaction = await Transactions.findOne({_id: req.params.id})
           
                if(transaction){
                    res.status(200).json({
                        message: `success get one data with ID : ${req.params.id}`,
                        transaction
                    })
                 } 
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: 'internal server error'
            })
        }
    },
    addOne : async (req, res) => {
        try {
            const product = await Products.findOne({_id: req.body.id_product})
            // let price = await product.price
            console.log(product);
            
            const cart = await Carts.findOne({_id: req.body.id_cart})
            let quantity = await cart.quantity
            // update carts
            const cartUpdateStatus = await Carts.findOneAndUpdate({_id: req.body.id_cart},{status_cart: false})
           
            // let totalPrice = await quantity * price;

            const newTransaction = await Transactions.create({
                ...req.body,
                // total_price: totalPrice
            })
            if(newTransaction){
                res.status(200).json({
                    newTransaction,
                    cartUpdateStatus
                })
            } else {
                res.status(400).json({
                    message: `Please input a valid data`,
                })
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: `Internal server error, please try again later`,
            })
        }
    },
    updateTransactions : async (req, res) => {
        try {
            const transaction = await Transactions.findOneAndUpdate({_id: req.params.id}, {...req.body})
            console.log(transaction);
            if(transaction){
                const cartUpdateStatus = await Carts.findOneAndUpdate({_id: req.body.id_cart}, {status_cart: true})
                console.log(cartUpdateStatus);
                res.status(200).json({
                    message: `success edit Product with ${req.params.id}`,
                    transaction
                })
            } else {
                res.status(400).json({
                    message: `failed edit Product with ${req.params.id}`,
                })
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: `Internal server error`,
            })
        }
      
    },
    destroyTransactions : async (req, res) => {
        try {
            const transaction = await Transactions.findOneAndDelete({_id: req.params.id})
            if(transaction){
                res.status(200).json({
                    message: `success delete Product with ${req.params.id}`,
                })
            } else {
                res.status(400).json({
                    message: `failed delete Product with ${req.params.id}`,
                })
            }
        }
        catch(error){
            res.status(500).json({
                message: `Internal server error`,
            })
        }
      
    }
}