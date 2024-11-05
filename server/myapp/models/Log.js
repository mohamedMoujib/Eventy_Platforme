// models/Log.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    entity: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'entity',
    },
    changes: {
      type: Schema.Types.Mixed, // Stores the changes made
      default: {},
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Log', LogSchema);
