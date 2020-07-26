const socket = io();

// Elements
const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const locationCta = document.querySelector('#location-cta');
const messageFormButton = messageForm.querySelector('button');
const messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
// Socket event for when a user wishes to send a messsage to other users
socket.on('message', message => {
  /* console.log(message); */

  const html = Mustache.render(messageTemplate, {
    username,
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

// Socket event for when a user wishes to send their location
socket.on('locationMessage', message => {
  // Create the html for the mustache template for sending the location
  const html = Mustache.render(locationMessageTemplate, {
    location: message.locationUrl,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

// The text form for creating and sending messages
messageForm.addEventListener('submit', e => {
  e.preventDefault();

  messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  // Socket event for when a user sends a message to the server
  socket.emit('sendMessage', message, err => {
    // The event acknowledgement and error handling
    messageFormButton.removeAttribute('disabled');
    messageFormInput.value = '';
    messageFormInput.focus();
    if (err) {
      return console.log(err);
    }

    console.log('Delivered');
  });
});

// The button for sending the users current location
locationCta.addEventListener('click', () => {
  // Message for users who do no have the geolocation available in their browser
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  locationCta.setAttribute('disabled', 'disabled');
  // Getting the user location when the button is clicked
  navigator.geolocation.getCurrentPosition(position => {
    /* console.log(position); */
    const location = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    // Socket even for sending the user location to the server
    socket.emit('sendLocation', location, err => {
      // Event acknowledgement and error handling
      locationCta.removeAttribute('disabled');
      console.log(err);
    });
  });
});

socket.emit('join', { username, room });
