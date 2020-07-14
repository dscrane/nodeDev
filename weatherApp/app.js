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
    const { lat, long, location } = data;
    if (err) {
      return errorLog('Mapbox API', err);
    } else {
      weatherStack(lat, long, (err, forecast) => {
        const {
          description,
          temp,
          feelsTemp,
          windSpeed,
          humidity,
          uvIndex,
        } = forecast;
        if (err) {
          return errorLog('Weather Stack API', err);
        } else {
          console.log(
            chalk`{cyan Forecast for ${location}:}\n  {yellow Currently:} ${description}\n  {yellow Temperature:} ${temp}\n  {yellow Feels Like:} ${feelsTemp}\n  {yellow Wind Speed:} ${windSpeed}\n  {yellow Humidity:} ${humidity}\n  {yellow UV Index:} ${uvIndex}`
          );
        }
      });
    }
  });
}
