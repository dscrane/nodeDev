const fs = require('fs');

const dataBuffer = fs.readFileSync('testing.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = 'Daegan';
data.age = 25;

const JSONString = JSON.stringify(data);
fs.writeFileSync('testing.json', JSONString);
