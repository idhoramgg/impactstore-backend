const Carts = require('../models/carts');

module.exports = {

     getAll : async (req, res) => {
         try {
            const carts = await Carts.find({})
            .populate({path: 'id_user', select: 'username'})
            .populate({path: 'id_product', select: 'product_name'})
            if(carts){
             res.status(200).json({
                message: 'get all carts',
                carts
               })
            } else {
                res.status(400).json({
                    message: 'failed to get all carts'
                })
            }
         }
         catch(error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error, try again later'
            })
         }
      
    },
    getOne : async (req, res) => {
        try {
            const cart = await Carts.findOne({_id: req.params.id})
            .populate({path: 'id_user', select: 'username'})
            .populate({path: 'id_product', select: 'product_name'})
          
            if(cart){
                res.status(200).json({
                   message: `Success to get one cart with id ${req.params.id}`,
                   cart
                  })
               } else {
                   res.status(400).json({
                       message: `Failed to get one cart with id ${req.params.id}`
                   })
               }
        } catch(error){
            console.log(error);
            res.status(500).json({
                message: 'Internal Server error'
            })
        }
       
    },
    addCart : async (req, res) => {
        try {
            const newCart = await Carts.create({
                ...req.body
            })
            if(newCart){
                res.status(200).json({
                    message: 'get all carts',
                    newCart
                   })
                } else {
                    res.status(400).json({
                        message: 'failed to get all carts'
                    })
                }   
        } catch(error){
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            })
        }
        
    },
    updateCarts : async (req, res) => {
        try {
            const carts = await Carts.findOneAndUpdate({_id: req.params.id}, {...req.body})
            if(carts){
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
    destroyCarts: async (req, res) => {
        try {
            const carts = await Carts.findOneAndDelete({_id: req.params.id})
            if(carts){
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