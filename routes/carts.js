const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addCart,
    destroyCarts,
    updateCarts
  
} = require ('../controllers/carts');

route.get('/carts', getAll);
route.get('/carts/:id', getOne);
route.post('/carts', addCart);
route.put('/carts/:id', updateCarts);
route.delete('/carts/:id', destroyCarts);



module.exports = route

