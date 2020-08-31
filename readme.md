passport-js

1. install library / Strategy yg mau digunakan
    `npm install passport`
    `npm install passport-local`
    `npm install passport-jwt`
    `npm install passport-facebook`

2. di dalam file root/index, initialize si passort

index.js

const passport = require('passport');

buat file konfigurasi beserta fungsi yang menyimpan semua strategy passport yg digunakan didalam projek kita.
`require('./config/strategies').strategies()`

initialize passport dan passport.session()
app.use(passport.initialize());
app.use(passport.session());


3. Buat konfigurasi strategy yang mau digunakan
`folder config --> strategies.js`

letakan kode ini dibawah setelah kita selesai menulis kode strategy
```js
    // id
    passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
          
          passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });
    // user
        passport.serializeUser(function(user, done) {
            done(null, user);
          });
          
          passport.deserializeUser(function(id, done) {
              done(err, user);
          });
```

4. buat module / kode untuk menjalankan authenticate dari strategy yang telah dibuat
    `/helpers/auth.js`
    sebagai module :
    ```js
    const jwtAuthenticate = (req, res, next) => {
    try {
        passport.authenticate("jwt", {session: false}, (err, user, info) => {
            if(err){
                return next(err);
            }
            if(!user){
                return res.json({
                    message: info.message
                })
            }
            next();
        })(req, res, next)
    }
    catch(error){
        console.log(error)
        return res.json({message: info.message})
    }
}
```
    secara langsung di index.js :
    ```js
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/auth/facebook/callback', passport.authenticate('facebook'),
    function(req, res) {
    res.json({
       message: 'welcome'
   })
  })
    ```

