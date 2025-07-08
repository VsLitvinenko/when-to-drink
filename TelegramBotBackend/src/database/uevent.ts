import { UVoteSchema } from './uvote';
import mongoose from 'mongoose';

export const UEventSchema = new mongoose.Schema({
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  starts: {
    type: Date,
    required: true,
  },
  ends: {
    type: Date,
    required: true,
  },
  votes: {
    type: Map,
    of: UVoteSchema,
    default: () => {},
  },
  description: String,
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

UEventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const UEventModel = mongoose.model('UEvent', UEventSchema);

export interface IEvent {
  creator: any;
  name: string;
  starts: string;
  ends: string;
  description?: string;
}

export interface IEventDb extends IEvent {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
}

export type PEvent = Partial<IEvent>;

export const getEventById = (id: any) => UEventModel.findById(id);
export const createEvent = (val: IEvent) => new UEventModel(val).save().then((uEvent) => uEvent.toObject());

export const updateEvent = (id: any, val: PEvent) =>
  UEventModel.findByIdAndUpdate(id, val)
    .then((event) => event.save())
    .then((event) => event.toObject());
