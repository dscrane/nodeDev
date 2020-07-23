require('dotenv').config();
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user');
const { userOneId, userOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Test User',
      email: 'test@email.com',
      password: 'testuserpass',
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Test User',
      email: 'test@email.com',
    },
    token: user.tokens[0].token,
  });

  // Check user password has been hashed
  expect(user.password).not.toBe('testuserpass');
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should fail to login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'incorrect@email.com',
    })
    .expect(418);
});

test('Should fetch the user profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not fetch profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'testing/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should not upload a image that is too large', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'testing/fixtures/fall.jpg')
    .expect(400);

  const user = await User.findById(userOne._id);
  expect(user.avatar).toBe(undefined);
});

test('Should not upload a file that is not an image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'testing/fixtures/sample-pdf-file.pdf')
    .expect(400);

  const user = await User.findById(userOne._id);
  expect(user.avatar).toBe(undefined);
});

test('Should update valid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'Updated User' })
    .expect(200);

  const user = await User.findById(userOne._id);

  expect(user.name).toEqual(response.body.name);
});

test('Should not update a user with invalid field', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'Invalid field' })
    .expect(400);
});
