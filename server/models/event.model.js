import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: [ 'Corporate', 'Social', 'Tech', 'Charity'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  format: {
    type: String,
    enum: ['Virtual', 'Hybrid', 'Physical'],
    required: true,
  },
  sitting: {
    type: String,
    enum: ['Indoor', 'Outdoor','theater'],
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  budget:{
    type:Number
  },
  attendees:{
    type:String
  },
 status: {
  type: String,
  enum: ['upcoming', 'completed', 'cancelled'],
  default: 'upcoming',
}
}, { timestamps: true });

eventSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[\s]+/g, '-') + '-' + Date.now();
  }
  next();
});

export default mongoose.model('Event', eventSchema);
