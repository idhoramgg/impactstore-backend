const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const db = require('./config/db')

const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const productImagesRouter = require('./routes/product_images')
const cartsRouter = require('./routes/carts')
const transactionsRouter = require('./routes/transactions')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Homepage')
})
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', productImagesRouter);
app.use('/api', cartsRouter);
app.use('/api', transactionsRouter);


db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we are connected'));

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})