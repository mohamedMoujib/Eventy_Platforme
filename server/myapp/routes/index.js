const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");
const reservationRoutes = require("./reservationRoutes");
const categoryRoutes = require("./categoryRoutes");
const messageRoutes = require("./messageRoutes");


router.use('/users', userRoutes);
router.use('/events',eventRoutes);
router.use('/reservations', reservationRoutes);
router.use('/categories', categoryRoutes);
router.use('/messages', messageRoutes);


module.exports=router;