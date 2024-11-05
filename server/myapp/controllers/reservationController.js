var express = require('express');
var router = express.Router();
const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');
const paginate = require('../utils/paginate')


// get all reservation
const getReservations = async(req, res) => {
    try{
        const result = await pagiante(Reservation,req);
        res.json(result);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}

//get reservation by id
const getReservationById = async(req, res) => {
    try{
        const reservation = await Reservation.findById(req.params.id);
        if(!reservation) return res.status(404).json({message: "reservation not found"});
        res.json(reservation);
    }catch (err) {
        res.status(500).json({message: err.message});

    }
}
/// Get reservations by event
const getReservationByEvent = async (req, res) => {
    try {
        const eventId = new mongoose.Types.ObjectId(req.params.event);
        const reservations = await Reservation.find({ event: eventId });

        // Check if no reservations were found
        if (reservations.length === 0) {
            return res.status(404).json({ message: "No reservations found for this event" });
        }

        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//create a new reservation
const createReservation = async(req,res) => {
    const reservation = new Reservation(req.body);
    try{
       const newReservation= await reservation.save();
       res.status(201).json(newReservation);
    }catch(err){
      res.status(400).json({message : err.message});
    }
  }
  
  // Update a reservation
  const updateReservation =  async (req, res) => {
    console.log("Updating Reservation ID:", req.params.id);
    console.log("Request Body:", req.body); // Log the incoming data
    
    try {
      const updatedReservation = await Reservation.findById(req.params.id);
      if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      const result = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      console.log("Updated Reservation Data:", result); // Log updated data
      if (!result) return res.status(404).json({ message: "Reservation not found for update" });
      res.json(result);
    } catch (err) {
      console.error("Update Error:", err);
      res.status(400).json({ message: err.message });
    }
  }
  
  
  
  
  // delete a reservation 
  const deleteReservation = async(req,res) => {
    try {
      const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
      res.json('Reservation deleted');
  
    }catch(err){
      res.json(err);
    }
  }
module.exports ={
    getReservationByEvent,
    getReservationById,
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
};
