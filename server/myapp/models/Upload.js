const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    entity: {
      type: String,
      enum: ['Event', 'User', 'Other'],
      required: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'entity',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Upload', UploadSchema);
