const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: {
    type: String,
    
  },
  tlogo: String, // logo URL or path
  description: String,
  experience: {
    type: String,
    required: true,
    default: "2+"
  },
  jobType: String, // e.g. "Full-time", "Internship"
  status: {
    type: String,
    enum: ['open', 'in progress', 'completed'],
    default: 'open'
  },
  location: String,
  salaryMin: String,
  salaryMax: String,
  deadline: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

module.exports = mongoose.model('Job', jobSchema);
