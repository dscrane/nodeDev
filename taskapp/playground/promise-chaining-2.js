require('../src/db/mongoose');
const Task = require('../src/models/task');

const removeAndCount = async (id, complete) => {
  const task = await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments(complete);

  return { task, count };
};

removeAndCount('5f1480d5cc7ac8108d1eb3bc', false)
  .then(result => console.log(result.count, result.task))
  .catch(err => console.log(err));
