const ProductImages = require('../models/product_images');
const Products = require('../models/products');

module.exports = {
    getAll : async (req, res) => {
        try {
            const productsImages = await ProductImages.find({}).populate('id_product')
           
            if(productsImages){
               res.status(200).json({
                   message: 'success get all data',
                   productsImages
               })
            } else {
                res.status(400).json({
                    message: 'failed to get all data', 
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
            const productImage = await ProductImages.findOne({_id: req.params.id})
            .populate('id_product')
                if(productImage){
                    res.status(200).json({
                        message: `success get one data with ID : ${req.params.id}`,
                        productImage
                    })
                 } else {
                    res.status(400).json({
                        message: 'failed to get one data', 
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
           const data = await ProductImages.create(
              {...req.body}
           );
           const product = await Products.findOneAndUpdate(
               {_id: req.body.id_product},
               {$push: {images: data._id}},
               { new: true}
           )
           res.status(200).send({
            message: `success`,
            product
          })
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: `Internal server error, please try again later`,
            })
        }
    }
}