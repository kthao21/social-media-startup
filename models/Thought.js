const { Schema } = require('mongoose');
const mongoose = require('mongoose');

//Define ReactionSchema for the subdocument
const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  }
});


const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  //Adds the reaction subdocument to the parent document as an array
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false, 
 }
);

//'reactionCount' virtual
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


//create a model named 'Thought'
const Thought = mongoose.model('Thought', ThoughtSchema);


module.exports = Thought;
