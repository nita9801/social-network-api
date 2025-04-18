const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Thought = require('../models/Thought');

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample Users
const users = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
  },
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
  },
];

// Sample Thoughts
const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: 'lernantino',
  },
  {
    thoughtText: 'I love coding!',
    username: 'john_doe',
  },
  {
    thoughtText: 'MongoDB is awesome!',
    username: 'jane_smith',
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Map thoughts to users
    const userMap = createdUsers.reduce((map, user) => {
      map[user.username] = user._id;
      return map;
    }, {});

    // Add userId to thoughts and insert them
    const thoughtsWithUserIds = thoughts.map((thought) => ({
      ...thought,
      userId: userMap[thought.username],
    }));

    const createdThoughts = await Thought.insertMany(thoughtsWithUserIds);

    // Update users with their thoughts
    for (const thought of createdThoughts) {
      await User.findByIdAndUpdate(thought.userId, {
        $push: { thoughts: thought._id },
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();