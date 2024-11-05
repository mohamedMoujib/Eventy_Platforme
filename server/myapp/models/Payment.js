// models/Payment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    reservation: {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'other'],
      default: 'stripe',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: {
      type: String, // ID from the payment gateway
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    receiptURL: {
      type: String, // URL to the payment receipt
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
