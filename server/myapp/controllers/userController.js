var express = require('express');
const User = require('../models/User');
const Message = require('../models/Message')
const paginate = require('../utils/paginate')

/* GET all users  . */
const getUsers = async(req, res) => {
  try{
    const result = await paginate(User,req);
    res.json(result);
  }
  catch (err) {
    res.status(500).json({message: err.message});
  }

};

//get users by id
const getUserByid = async (req, res) => {
  console.log("Requested ID:", req.params.id); // Log the ID

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all messages of a specific user (as sender or receiver)
const getUserMessages = async (req, res) => {
  try {
      const userId = req.params.userId;
      const messages = await Message.find({
          $or: [{ sender: userId }, { receiver: userId }]
      });
      if (messages.length === 0) {
          return res.status(404).json({ message: "No messages found for this user" });
      }
      res.json(messages);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};





// Update a user
const userUpdate = async (req, res) => {
  console.log("Updating User ID:", req.params.id);
  console.log("Request Body:", req.body); // Log the incoming data
  
  try {
    const updatedUser = await User.findById(req.params.id);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }


    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    console.log("Updated User Data:", result); // Log updated data
    
    if (!result) return res.status(404).json({ message: "User not found for update" });

    res.json(result);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(400).json({ message: err.message });
  }
}




// delete a user 
const userDelete = async(req,res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json('User deleted');

  }catch(err){
    res.json(err);
  }
}
module.exports = {
    getUsers,
    getUserByid,
    userUpdate,
    userDelete,
    getUserMessages
  };