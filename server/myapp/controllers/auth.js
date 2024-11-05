const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}

//login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user =  await User.login(email,password)

        // create token
        const token = createToken(user._id)
        res.status(200).json({email: user.email,token})

    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//signup a user 
const signupUser = async(req, res) =>{
    const {email,password,username,role,profilePicture,address,contactNumber}=req.body

    try{
        const user = await User.signup(email,password,username,role,profilePicture,contactNumber,address)
        //create a token
        const token = createToken(user._id)
        res.status(200).json({user , token})

    }catch (err){
        res.status(400).json({message: err.message})
    }
}
module.exports = {signupUser,loginUser}