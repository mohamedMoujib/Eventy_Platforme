const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema;

const UserSchema =new Schema({
    username: {
        type : String,
        required: true ,
        unique: true ,
        trim : true ,
        minlength: 3,
        maxlength: 30,

    },
    email: {
        type: String ,
        required : true,
        unique : true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],

    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,

    },
    role: {
        type : String,
        enum : ['user','admin'],
        default :'user',
    },
    profilePicture: {
        type: String,
        default:'',
    },
    contactNumber: {
        type: String,
        trim: true,
        default: '',
    },
    address: {
        type: String,
        trim: true,
        default: '',
    },
    },
    { timestamps: true }

);
UserSchema.statics.signup = async function(email, password, username, role,profilePicture,contactNumber,address) {

    // validation
    if (!email || !password || !role || !username || !contactNumber || !address) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash , username,role,profilePicture,address,contactNumber})
  
    return user
  }
  
  // static login method
  UserSchema.statics.login = async function(email, password) {
  
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }
const User = mongoose.model('User',UserSchema);
module.exports = User;