import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [ 'Catering', 'Audio/Visual', 'Decoration', 'Security'],
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Flagged', 'Blocked'],
    default: 'Pending',
  },
  phone: {
    type: Number,
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  
  slug: {
    type: String,
    unique: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  services:[{
    type: String,
  }],
  recentEvents:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event'},

}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
