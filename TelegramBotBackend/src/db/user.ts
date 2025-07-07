import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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

export const getUserById = (id: any) => UserModel.findById(id);
export const getUserByTgId = (tgId: number) => UserModel.findOne({ tgId });
export const createUser = (values: Record<string, any>) => new UserModel(values);
export const updateUser = (id: any, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);