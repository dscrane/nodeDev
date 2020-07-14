const chalk = require('chalk');
const { errorLog, textLog } = require('./chalkLogs copy');
const geocode = require('./utils/geocode');
const weatherStack = require('./utils/weatherStack');

let searchLocation = process.argv[2];

if (!searchLocation) {
  errorLog('Invalid Input', 'Please provide a location like this:');
  textLog('  node app.js <location>');
} else {
  geocode(searchLocation, (err, data) => {
    if (err) {
      return errorLog('Mapbox API', err);
    } else {
      weatherStack(data.lat, data.long, (err, forecast) => {
        if (err) {
          return errorLog('Weather Stack API', err);
        } else {
          console.log(
            chalk`{cyan Forecast for ${data.location}:}\n  {yellow Currently:} ${forecast.description}\n  {yellow Temperature:} ${forecast.temp}\n  {yellow Feels Like:} ${forecast.feelsTemp}`
          );
        }
      });
    }
  });
}
