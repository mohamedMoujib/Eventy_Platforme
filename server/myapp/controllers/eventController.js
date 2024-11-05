var express = require('express');
var router = express.Router();
const Event = require('../models/Event');
const paginate = require('../utils/paginate')


/*Get all events . */
const getEvents = async(req,res) => {
    try{
        const result = await paginate(Event,req);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}


//get event by id
const getEventByid = async(req,res) =>{
    try{
        const event = await Event.findById(req.params.id);
        res.json(event);
    }
    catch (err){
        res.status(500).json({message : err.message});
    }
}

//create a new event
const createEvent = async(req,res) => {
    const event = new Event(req.body);
    try{
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    }catch (err){
        res.status(400).json({message : err.message});
    }
}

//update a event 
const updateEvent = async(req,res) => {
    try{
        const Updatedevent = await Event.findByIdAndUpdate(req.params.id,req.body,{new:true});
        console.log("Updated Event Data :", Updatedevent)
        res.json(Updatedevent);
    }catch (err){
        res.status(400).json({message: err.message});
    }
}

//delete a event
const deleteEvent = async(req,res)=>{
    try{
        const event= await Event.findByIdAndDelete(req.params.id);
        res.json('Event Deleted');
    }catch(err){
        res.json(err);
    }

}
module.exports ={
    getEvents,
    getEventByid,
    createEvent,
    updateEvent,
    deleteEvent
}
