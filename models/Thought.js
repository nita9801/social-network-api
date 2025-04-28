// Imports
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Creates Thought model with thoughtSchema
const Thought = model('Thought', thoughtSchema);
// export
module.exports = Thought;