const route = require('express').Router()


const {
    getAll,
    getOne,
    register,
    login
} = require ('../controllers/users');

route.get('/users', getAll);
route.get('/users/:id', getOne);
route.post('/users/register', register);
route.post('/users/login',login);

module.exports = route

