const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addOne
  
} = require ('../controllers/transactions');

route.get('/transactions', getAll);
route.get('/transactions/:id', getOne);
route.post('/transactions', addOne);


module.exports = route

