const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

const id = new ObjectID();
console.log(id);
console.log(id.id);
console.log(id.toHexString());
console.log(id.id.length);
console.log(id.toHexString().length);
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log('there was an error');
    }

    const db = client.db(databaseName);
    /* 
    db.collection('users').insertOne(
      {
        _id: id,
        name: 'Billy',
        age: '20',
      },
      (err, result) => {
        if (err) {
          return console.log('Unable to insert user');
        }

        console.log(result.ops);
      }
    );
 */
    /* db.collection('users').insertMany(
      [
        {
          name: 'Jen',
          age: 30,
        },
        {
          name: 'Sally',
          age: 25,
        },
      ],
      (err, result) => {
        if (err) {
          return console.log('Could not insert users');
        }

        console.log(result.ops);
      }
    ); */

    /*  db.collection('tasks').insertMany(
      [
        {
          description: 'Get Mongodb working',
          completed: true,
        },
        {
          desctiption: 'Finish Node Dev Course',
          completed: false,
        },
        {
          desctiption: 'Eat breakfast',
          completed: false,
        },
      ],
      (err, result) => {
        if (err) {
          return console.log('There was an error inserting these tasks');
        }

        console.log(result.ops);
      }
    ); */

    /* db.collection('users').findOne(
      { _id: ObjectID('5f11b6dc741758323a690fbf') },
      (err, result) => {
        if (err) {
          return console.log('We could not find this user');
        }

        console.log(result);
      }
    ); */

    /* db.collection('users')
      .find({ name: 'Daegan' })
      .toArray((err, result) => {
        console.log(result);
      });
    db.collection('users')
      .find({ name: 'Daegan' })
      .count((err, result) => {
        console.log(result);
      }); */
  }
);
