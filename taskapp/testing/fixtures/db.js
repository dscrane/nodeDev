const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'User One',
  email: 'userone@email.com',
  password: 'useronepass',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'User Two',
  email: 'usertwo@email.com',
  password: 'usertwopass',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const userOneTaskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'This is the first task for user one',
  completed: false,
  author: userOneId,
};

const userOneTaskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'This is the second task for user one',
  completed: true,
  author: userOneId,
};

const userTwoTaskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'This is the first task for user two',
  completed: false,
  author: userTwoId,
};

const userTwoTaskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'This is the second task for user two',
  completed: true,
  author: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(userOneTaskOne).save();
  await new Task(userOneTaskTwo).save();
  await new Task(userTwoTaskOne).save();
  await new Task(userTwoTaskTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  userOneTaskOne,
  userOneTaskTwo,
  userTwoTaskOne,
  userTwoTaskTwo,
  setupDatabase,
};
