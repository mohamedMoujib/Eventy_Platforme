var express = require('express');
var router = express.Router();
const {getEvents ,getEventByid,createEvent,updateEvent,deleteEvent} = require('../controllers/eventController');


/*Get all events . */
router.get('/', getEvents)


//get event by id
router.get('/:id',getEventByid)

//create a new event
router.post('/' , createEvent)

//update a event 
router.put('/:id', updateEvent)

//delete a event
router.delete('/:id', deleteEvent)

module.exports= router;