require('../src/db/mongoose');
const User = require('../src/models/user');

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });

  return count;
};

updateAgeAndCount('5f1342def69faa39d127e2b4', 3)
  .then(count => console.log(count))
  .catch(err => console.log(err));
