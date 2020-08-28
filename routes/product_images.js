const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addOne,
    destroyProductsImage,
    updateProductsImage
  
} = require ('../controllers/product_images');

route.get('/products_images', getAll);
route.get('/products_images/:id', getOne);
route.post('/products_images', addOne);
route.put('/products_images/:id', updateProductsImage);
route.delete('/products_images/:id', destroyProductsImage);


module.exports = route

