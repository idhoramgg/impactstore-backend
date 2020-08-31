const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema

const usersSchema = new Schema({
    providerId: {
        type: String,
        require: false
    },
    provider: {
        type: String,
        require: false
    },
    fullname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    },
   
}, {timestamps: true})

usersSchema.plugin(findOrCreate);

const Users = mongoose.model('users', usersSchema)

module.exports = Users;