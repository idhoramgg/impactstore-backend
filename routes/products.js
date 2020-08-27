const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addOne
  
} = require ('../controllers/products');

route.get('/products', getAll);
route.get('/products/:id', getOne);
route.post('/products', addOne);


module.exports = route

