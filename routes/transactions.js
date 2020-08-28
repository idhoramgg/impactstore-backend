const route = require('express').Router()
const { validateToken } = require('../helpers/token')


const {
    getAll,
    getOne,
    addOne,
    updateTransactions,
    destroyTransactions
  
} = require ('../controllers/transactions');

route.get('/transactions', getAll);
route.get('/transactions/:id', getOne);
route.post('/transactions', addOne);
route.put('/transactions/:id', updateTransactions);
route.delete('/transactions/:id', destroyTransactions);


module.exports = route

