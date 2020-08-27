const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addOne
  
} = require ('../controllers/product_images');

route.get('/products_images', getAll);
route.get('/products_images/:id', getOne);
route.post('/products_images', addOne);


module.exports = route

