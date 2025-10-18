import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'doctor', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);