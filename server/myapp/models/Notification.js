// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['reservation', 'payment', 'event', 'general'],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedEntity: {
      type: Schema.Types.ObjectId,
      refPath: 'type', // Can reference different models based on 'type'
      default: null,
    },
    notificationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
