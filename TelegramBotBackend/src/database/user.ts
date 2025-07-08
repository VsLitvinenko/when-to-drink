import mongoose from 'mongoose';

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

export interface IUserDb extends IUser {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
};

export type PUser = Partial<IUser>;

export const getUserById = (id: any) => UserModel.findById(id);
export const getUserByTgId = (tgId: number) => UserModel.findOne({ tgId });
export const createUser = (val: IUser) => new UserModel(val).save().then((user) => user.toObject());

export const updateUser = (id: any, val: PUser) =>
  UserModel.findByIdAndUpdate(id, val)
    .then((user) => user.save())
    .then((user) => user.toObject());