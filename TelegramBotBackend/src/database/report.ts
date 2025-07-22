import mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
  userTgId: {
    type: Number,
    required: true,
  },
  chatId: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  screenshot: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved'],
    default: 'open',
  },
  developerNotes: String,
});

export const ReportModel = mongoose.model('Report', ReportSchema);

export const createReport = async (userTgId: number, chatId: number, description: string, screenshot?: string) => {
  const report = new ReportModel({ userTgId, chatId, description, screenshot });
  return await report.save().then((report) => report.toObject());
}