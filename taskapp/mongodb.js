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

    db.collection('users')
      .deleteMany({ age: 25 })
      .then(result => console.log(result))
      .catch(err => console.log(err));

    db.collection('tasks')
      .deleteOne({ description: 'Eat breakfast' })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
);
