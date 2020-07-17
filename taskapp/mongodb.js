const { MongoClient, ObjectID } = require('mongodb');

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

    db.collection('tasks').findOne(
      { _id: ObjectID('5f11bf6947da683290e423bd') },
      (err, result) => {
        if (err) {
          return console.log(err);
        }

        console.log(result);
      }
    );

    db.collection('tasks')
      .find({ completed: false })
      .toArray((err, result) => {
        console.log(result);
      });
  }
);
