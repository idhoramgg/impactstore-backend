const bcrypt = require('bcrypt');
const Users = require('../models/users');
const { createToken } = require('../helpers/token');

module.exports = {
    getAll : async (req, res) => {
        try {
            const users = await Users.find({})
            if(users){
               res.status(200).json({
                   message: 'success get all data',
                   users
               })
            }
        }
        catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'internal server error'
            })
        }
    },
    getOne: async (req, res) => {
        try {
            const user = await Users.findOne({_id: req.params.id})
                if(user){
                    res.status(200).json({
                        message: `success get one data with ID : ${req.params.id}`,
                        user
                    })
                 }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: 'internal server error'
            })
        }
    },
    register: async (req, res) => {
        try {
            const user = await Users.findOne({email: req.body.email})
            if(user === null){
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const newUser = await Users.create({
                    ...req.body,
                    password: hashedPassword,
                })
                if(newUser){
                    res.status(200).json({
                        message: 'register success',
                        newUser
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid data input'
                    })
                }
            } else {
                res.status(401).json({
                    message: 'User already exist'
                })
            }
          
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: 'internal server error'
            })
        }
    },
    login: async (req, res) => {
        try {
            const user = await Users.findOne({email: req.body.email})
            if(user){
                const comparePassword = await bcrypt.compare(req.body.password, user.password)
                if(!comparePassword){
                    res.status(400).json({
                        message: 'Password salah'
                    })
                } else {
                    const tokenData = {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }
                    const token = createToken(tokenData)
                    res.status(200).json({
                        message: `Selamat datang ${user.username}`,
                        token
                    })
                }
            }
            else {
                res.status(400).json({
                    message: 'Email / Account tidak ditemukan'
                })
            }
        }
        catch(error) {
            console.log(error)
        }
    }

}