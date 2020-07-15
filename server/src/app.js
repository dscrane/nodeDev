const path = require('path');
const express = require('express');

const app = express();
// Define paths for Express Config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Set up handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Set up static directory to serve
app.use(express.static(publicDir));

// Set up home page route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    location: 'Boston',
  });
});

// Set up about page route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Daegs',
  });
});

// Set up help page route
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    heading: 'Help Page',
  });
});

// Set up weather page route
app.get('/weather', (req, res) => {
  res.send({
    location: 'Boston, Massachusetts',
    forecast: {
      temp: '75',
      feelsLike: '80',
    },
  });
});

// Start up server listening at port 3000
app.listen(3000, () => {
  console.log('[APP]: listening on http://localhost:3000');
});
