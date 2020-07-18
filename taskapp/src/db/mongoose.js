const mongoose = require('mongoose');
const validator = require('validator');

const databaseName = 'task-manager-api';
const connectionURL = `mongodb://127.0.0.1:27017/${databaseName}`;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

/* const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('A password cannot contain the word "password"');
      }
    },
  },
});

const name = new User({
  name: '     John        ',
  email: '    miKe@emAIl.com         ',
  password: '        phonesdf334   ',
});

name
  .save()
  .then(() => {
    console.log(name);
  })
  .catch(err => console.log('Error: ', err.message)); */

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const newTask = new Task({
  description:
    '     Understand basic Mongoose models                          ',
});

newTask
  .save()
  .then(() => {
    console.log(newTask);
  })
  .catch(err => console.log(err));
