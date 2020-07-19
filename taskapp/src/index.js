const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201).send(user))
    .catch(err => res.status(418).send(err));
});

app.get('/users', (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send());
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then(user => (!user ? res.status(404).send() : res.send(user)))
    .catch(err => res.status(500).send());
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(418).send(err));
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => res.send(tasks))
    .catch(err => res.status(500).send());
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then(task => (!task ? res.status(404).send() : res.send(task)))
    .catch(err => res.status(500).send());
});

app.listen(PORT, () =>
  console.log(`[APP]: listening on http://localhost:${PORT}`)
);
