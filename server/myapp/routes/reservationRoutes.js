var express = require('express');
var router = express.Router();
const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');
const { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');


// get all reservation
router.get('/', getReservations)

//get reservation by id
router.get('/:id', getReservationById)
/// Get reservations by event
router.get('/ByEvent/:event', getReservationById)

//create a new reservation
router.post('/',createReservation)
  
  // Update a reservation
  router.put('/:id', updateReservation)
  
  // delete a reservation 
  router.delete('/:id', deleteReservation)
module.exports = router;
