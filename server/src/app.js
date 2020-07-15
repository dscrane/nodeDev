const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
// Define paths for Express Config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDir));

// Set up home page route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Daegs',
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
    name: 'Daegs',
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

// Set up help subpage route
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page Not Found',
    content: 'This help page was not found',
    name: 'Daegs',
  });
});

// Set up 404 page not found route
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page Not Found',
    content: 'Page not found',
    name: 'Daegs',
  });
});

// Start up server listening at port 3000
app.listen(3000, () => {
  console.log('[APP]: listening on http://localhost:3000');
});
