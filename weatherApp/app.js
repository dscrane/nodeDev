const { errorLog } = require('./chalkLogs copy');
const request = require('postman-request');
const dotenv = require('dotenv');
dotenv.config();

const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=${process.env.MAPBOXKEY}&limit=1`;

request({ url: mapboxUrl, json: true }, (err, res) => {
  if (err) {
    errorLog('Mapbox API', 'Unable to connect to location services');
  } else if (res.body.features.length === 0) {
    errorLog(
      'Mapbox API',
      'Unable to find location. Please try a different search term'
    );
  } else {
    const lat = res.body.features[0].center[1];
    const long = res.body.features[0].center[0];
    console.log(`The latitude is ${lat} and the longitude is ${long}`);
  }
});

/* const queryData = `${searchLat},${searchLong}`;
const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.ACCESSKEY}&query=${queryData}&units=f`;
request({ url: weatherUrl, json: true }, (err, res) => {
  if (err) {
    errorLog('Weather Stack API', 'Unable to connect to the weather service');
  } else if (res.body.error) {
    errorLog('Weather Stack API', 'Unable to find this location.');
  } else {
    const temp = res.body.current.temperature;
    const feelsTemp = res.body.current.feelslike;
    const description = res.body.current.weather_descriptions[0];

    console.log(
      `${description}. It is currently ${temp} degrees outside but it feels like ${feelsTemp} degrees.`
    );
  }
});
 */
