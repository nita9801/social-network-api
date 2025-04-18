const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI,);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));