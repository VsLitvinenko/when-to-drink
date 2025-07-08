import mongoose, { Types } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  tgId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
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
  firstName: String,
  lastName: String,
  photoUrl: String,
});

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export const UserModel = mongoose.model('User', UserSchema);

export interface IUser {
  tgId: number;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export type PUser = Partial<IUser>;

export const getUserById = (id: Types.ObjectId) => UserModel.findById(id);
export const getUserByTgId = (tgId: number) => UserModel.findOne({ tgId });
export const createUser = (values: IUser) => new UserModel(values).save().then((user) => user.toObject());
export const updateUser = (id: any, values: PUser) => UserModel.findByIdAndUpdate(id, values);