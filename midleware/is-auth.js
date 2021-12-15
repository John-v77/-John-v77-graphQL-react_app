const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false
        return next()
    }

    /* token will be a string will have to split it to get the value
        after split [Bearer, hashedPassword]*/
    const token = authHeader.split(' ')[1] // Authorization: Bearer fghfklalaj
    if(!token || token ===''){
        req.isAuth = false
        return next()
    }

    try{
        const decodedToken = jwt.verify(token, 'superLongerSuperSecretKey')
    }catch(err){
        req.isAuth = false
        return next()
    }
    
    if(!decodedToken){
        req.isAuth = false
        return next()
    }

    //if no error was found, the token is valid
    req.isAuth = true
    req.userId = decodedToken.userId
    next()

}