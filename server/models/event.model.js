import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: {type: String, required: true,},
  eventType: {type: String,enum: [ 'Corporate', 'Social', 'Tech', 'Charity'],required: true, },
  date: {type: Date, required: true},
  format: {type: String, enum: ['Virtual', 'Hybrid', 'Physical'], required: true,},
  sitting: { type: String, enum: ['Indoor', 'Outdoor','theater'], required: true },
  venue: { type: String, required: true, },
  slug: { type: String, unique: true, },
  budget:{type:Number},
  attendees:{ type:String },
 status: {type: String, enum: ['upcoming', 'completed', 'cancelled'],default: 'upcoming',},
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  time: { type: String, required: true },
  endTime: { type: String, required: true },
  endDate: { type: Date, required: true },  
  description: { type: String, default: 'No description provided' },
  tags: { type: [String], default: [] },
  spent: { type: Number, default: 0 },
  organizer: { type: String, default: 'No organizer provided' },
  

}, { timestamps: true });

eventSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[\s]+/g, '-') + '-' + Date.now();
  }
  next();
});

export default mongoose.model('Event', eventSchema);
