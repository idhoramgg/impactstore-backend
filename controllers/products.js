const Products = require('../models/products');

module.exports = {
    getAll : async (req, res) => {
        try {
            const products = await Products.find({}).populate({path: 'images', select: 'url_image -_id'})
            if(products){
               res.status(200).json({
                   message: 'success get all data',
                   products
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
            const product = await Products.findOne({_id: req.params.id})
            .populate({path: 'images', select: 'url_image -_id'})
                if(product){
                    res.status(200).json({
                        message: `success get one data with ID : ${req.params.id}`,
                        product
                    })
                 }
                 else {
                    res.status(400).json({
                        message: `failed to get one data with ID : ${req.params.id}`,
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
            const newProduct = await Products.create({
                ...req.body
            })
            if(newProduct){
                res.status(200).json({
                    newProduct
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
    updateProducts : async (req, res) => {
        try {
            const product = await Products.findOneAndUpdate({_id: req.params.id}, {...req.body})
            if(product){
                res.status(200).json({
                    message: `success edit Product with ${req.params.id}`,
                })
            } else {
                res.status(400).json({
                    message: `failed edit Product with ${req.params.id}`,
                })
            }
        }
        catch(error){
            res.status(500).json({
                message: `Internal server error`,
            })
        }
      
    },
    destroyProducts: async (req, res) => {
        try {
            const product = await Products.findOneAndDelete({_id: req.params.id})
            if(product){
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