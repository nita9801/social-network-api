const { Schema, model } = require('mongoose');

// user schema
const userSchema = new Schema(
  {
    userId: {
      type: String,
      default: () => new Date().getTime().toString(), // Example: Generate a unique string
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to get friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// export
const User = model('User', userSchema);
module.exports = User;