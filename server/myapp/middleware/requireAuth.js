const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async(req, res, next) => {
    //verify user is authenticated
    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split('')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

const checkRole = (roles) => {
    return (req, res, next) =>{
        const { user }=req;
        if(!roles.includes(user.role)) {
            return res.status(403).json({error : 'Access denied ! '})
        }
        next()
    }
}

module.exports = { requireAuth , checkRole }