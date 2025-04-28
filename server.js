// imports
const mongoose = require('mongoose');
const express = require('express');
const db = require("./config/connection");
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI,);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));