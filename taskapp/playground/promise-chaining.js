require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5f1342def69faa39d127e2b4', { age: 22 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 0 });
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));
