const passport = require('passport');


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

module.exports = {
    jwtAuthenticate
}