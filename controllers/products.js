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
    }
}