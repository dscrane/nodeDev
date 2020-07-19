require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndRemove('5f134a7e2e90df3a2f42bde0')
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(results => console.log(results))
  .catch(err => console.log(err));
