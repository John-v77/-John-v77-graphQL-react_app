const jwt = require('jsonwebtoken')

module.exports = 
    async (req, res, next) => {

    const authHeader = await req.get('Authorization')

    // console.log("is auth :", authHeader)
    if(!authHeader){
        req.isAuth = false
        return next()
    }

    /* token will be a string will have to split it to get the value
        after split [Bearer, hashedPassword]*/
    const token = authHeader.split(' ')[1] // Authorization: Bearer fghfklalaj
    // console.log("is auth :", token)

    if(!token || token ===''){
        req.isAuth = false
        return next()
    }

    let decodedToken
    try{
        decodedToken = await jwt.verify(token, 'superLongerSuperSecretKey')
        // console.log("is auth decodedToken**:", decodedToken) 
    }catch(err){
        req.isAuth = false
        throw err
        return next()
    }
    
    if(!decodedToken){
        // console.log('false test')
        req.isAuth = false
        return next()
    }
    
    req.isAuth = true
    req.userId = decodedToken.userId
    // console.log("is auth userId **:", req.userId)
    next()
}
