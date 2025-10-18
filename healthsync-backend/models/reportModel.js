import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  filePath: String,
  rawText: String,
  aiAnalysis: Object,
  status: { type: String, enum: ['uploaded', 'processing', 'done', 'failed'], default: 'uploaded' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', ReportSchema);