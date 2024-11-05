// models/Favorite.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    favoritedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

FavoriteSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);
