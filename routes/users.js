const route = require('express').Router()
const { jwtAuthenticate } = require('../helpers/auth');

const {
    getAll,
    getOne,
    register,
    login,
    updateUser,
    destroyUser
} = require ('../controllers/users');

route.get('/users', getAll);
route.get('/users/:id', getOne);
route.post('/users/register', register);
route.post('/users/login',login);
route.put('/users/:id', jwtAuthenticate, updateUser);
route.delete('/users/:id',destroyUser);

module.exports = route

