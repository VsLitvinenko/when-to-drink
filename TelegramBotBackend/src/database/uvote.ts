import mongoose from 'mongoose';

export const UVoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  dates: {
    type: [{
      date: {
        type: Date,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      start: Date,
      end: Date,
    }],
    default: () => [] as any[],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
});

export const UVoteModel = mongoose.model('UVote', UVoteSchema);