// models/Setting.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', SettingSchema);
