require('dotenv').config();
const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task');

const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase,
  userOneTaskOne,
  userOneTaskTwo,
  userTwoTaskOne,
  userTwoTaskTwo,
} = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', userOne.tokens[0].token)
    .send({ description: 'Create first test task' })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Should return all user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});

test('Should not let an unauthorized user delete tasks', async () => {
  await request(app)
    .get(`./tasks/${userOneTaskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = Task.findById(userOneTaskOne._id);
  expect(task).not.toBeNull();
});
