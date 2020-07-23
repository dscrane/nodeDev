const mongoose = require('mongoose');
require('dotenv').config();

const connectionURL = process.env.DB_TEST_URL;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
