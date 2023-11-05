const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
 }, 
 {
  toJSON: {
    virtuals: true,
  },
  id: false, 
 }
 );


//create a virtual property called 'friendCount'
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const User = mongoose.model('User', UserSchema);

module.exports = User;