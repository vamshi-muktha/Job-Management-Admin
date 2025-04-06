const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // used as login identifier
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  role: { type: String, enum: ['admin', 'user'], default: 'user' }

});

// Use Passport-Local Mongoose plugin
userSchema.plugin(passportLocalMongoose); // defaults to `username` as the field

module.exports = mongoose.model('User', userSchema);
