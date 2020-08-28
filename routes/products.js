const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addOne,
    destroyProducts,
    updateProducts
  
} = require ('../controllers/products');

route.get('/products', getAll);
route.get('/products/:id', getOne);
route.post('/products', addOne);
route.delete('/products/:id', destroyProducts);
route.put('/products/:id', updateProducts);


module.exports = route

