const express = require('express')
const app = express()
const passport = require('passport')
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const db = require('./config/db')

const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const productImagesRouter = require('./routes/product_images')
const cartsRouter = require('./routes/carts')
const transactionsRouter = require('./routes/transactions')

// use strategies from our config
require('./config/strategies').strategies()
app.use(cors())
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


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// FACEBOOK AUTHENTICATE
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
   res.json({
       message: 'welcome'
   })
  });

// END FACEBOOK AUTHENTICATE

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we are connected'));

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})