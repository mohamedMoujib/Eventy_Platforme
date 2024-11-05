const mongoose= require('mongoose');
const  Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    event:{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    quantity: {
        type: Number,
        required: true,
        min: 1,

    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,

    },
    paymentStatus:{
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',

    },
    paymentId: {
        type: String,
        default: '',

    },
    reservationDate: {
        type: Date,
        default: Date.now,

    },
},
{timestamps:true}


);
const Reservation = mongoose.model('Reservation',ReservationSchema);
module.exports = Reservation;
