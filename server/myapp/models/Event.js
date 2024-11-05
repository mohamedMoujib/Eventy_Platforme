const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    title: {
        type : String,
        required : true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type : String,
        required : true,
        trim : true,
        maxlength: 2000,
    },
    category : {
        type : Schema.Types.ObjectId ,
        ref : 'Category',
        required : true ,

    },
    date : {
        type : Date ,
        required : true ,
        default : Date.now,

    },
    time : {
        type : String ,
        required : true,
    },
    location : {
        type : String,
        required: true,
        trim : true,
        maxlength : 200,
    },
    imageURL: {
        type: String,
        default: '',
    },
    createdBy: {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    price : {
        type: Number,
        default: 0.0,
        min:0,

    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
    },
    reservedCount: {
        type: Number,
        default:0,
        min: 0
    },
    status: {
        type: String,
        enum: ['upcoming','ongoing','completed','cancelled'],
        default :'upcoming',
    },
    tags: [ 
        {
        type: String,
        trim: true,
    },
],


},
{timestamps: true}
);
const Event = mongoose.model('Event',EventSchema);
module.exports = Event;