import mongoose from 'mongoose';

export const UVoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'UEvent',
    required: true,
  },
  dates: {
    required: true,
    type: [{
      date: { type: Date, required: true },
      type: { type: String, required: true },
      start: Date,
      end: Date,
    }],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

UVoteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const UVoteModel = mongoose.model('UVote', UVoteSchema);