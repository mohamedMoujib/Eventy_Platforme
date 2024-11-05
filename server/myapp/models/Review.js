const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    reviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
