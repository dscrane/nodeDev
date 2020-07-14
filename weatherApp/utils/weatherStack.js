const request = require('postman-request');
const dotenv = require('dotenv');
dotenv.config();

const weatherStack = (lat, long, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERKEY}&query=${lat},${long}&units=f`;
  request({ url: weatherUrl, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to the weather service');
    } else if (res.body.error) {
      callback('Unable to find this location.');
    } else {
      const forecast = {
        temp: res.body.current.temperature,
        feelsTemp: res.body.current.feelslike,
        description: res.body.current.weather_descriptions[0],
      };

      callback(undefined, forecast);
    }
  });
};

module.exports = weatherStack;
