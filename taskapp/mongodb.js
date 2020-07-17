const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

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
        name: 'Daegan',
        age: '20s',
      },
      (err, result) => {
        if (err) {
          return console.log('Unable to insert user');
        }

        console.log(result.ops);
      }
    ); */

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

    db.collection('tasks').insertMany(
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
    );
  }
);
