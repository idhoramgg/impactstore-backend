const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addCart
  
} = require ('../controllers/carts');

route.get('/carts', getAll);
route.get('/carts/:id', getOne);
route.post('/carts', addCart);



module.exports = route

