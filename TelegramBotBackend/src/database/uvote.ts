import mongoose from 'mongoose';
import { IUserDb } from './user';
import { addVoteToEvent } from './uevent';

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
      voteType: {
        type: String,
        enum: ['ready', 'maybe', 'time'],
        default: 'ready',
      },
      date: { type: Date, required: true },
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

UVoteSchema.post('save', function(doc, next) {
  // add vote push only unique vote ids
  addVoteToEvent(doc.event, doc._id).then(() => next());
});

export const UVoteModel = mongoose.model('UVote', UVoteSchema);

export interface IVote {
  user: any;
  event: any;
  dates: Array<{
    date: string;
    voteType: string;
    start?: string;
    end?: string;
  }>;
};

export interface IVoteDb extends IVote {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
};

export interface IVoteUserDb extends IVoteDb {
  user: IUserDb;
}

export type PVote = Omit<IVote, 'user' | 'event'>;

export const getVoteById = (id: any) => UVoteModel.findById(id);
export const getVotesByUser = (user: any) => UVoteModel.find({ user });
export const isVoteExist = (user: any, event: any) => UVoteModel.exists({ user, event }) .then((exist) => exist?._id);
export const createVote = (val: IVote) => new UVoteModel(val).save().then((vote) => vote.toObject());
export const deleteVotesByEvent = (event: any) => UVoteModel.deleteMany({ event });

export const updateVote = (id: any, val: PVote) =>
  UVoteModel.findByIdAndUpdate(id, val, { new: true })
    .then((vote) => vote.save())
    .then((vote) => vote.toObject());