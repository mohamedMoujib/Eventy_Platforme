var express = require('express');
var router = express.Router();
const { getUsers, getUserByid, userUpdate, userDelete, getUserMessages } = require('../controllers/userController');
const {loginUser,signupUser} = require('../controllers/auth')
const {requireAuth} = require('../middleware/requireAuth')
/* GET all users  . */
router.get('/', getUsers);

//get users by id
router.get('/:id', getUserByid);


// Login
router.post('/login',loginUser);

// signup
router.post('/signup',signupUser);

// Update a user
router.put('/:id', userUpdate);

// delete a user 
router.delete('/:id', userDelete);

//get user messages 
router.get('/:userId/messages', requireAuth,getUserMessages);

module.exports = router;
