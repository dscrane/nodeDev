require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendWelcomeEmail = (recipEmail, recipName) => {
  sgMail.send({
    to: recipEmail,
    from: 'daegdev@gmail.com',
    subject: 'Welcome to the Task Manager',
    text: `Hello ${recipName}! \n \tWe are excited to have you on board. You can now create a profile and get to your tasks.`,
  });
};

const sendCancelationEmail = (recipEmail, recipName) => {
  sgMail.send({
    to: recipEmail,
    from: 'daegdev@gmail.com',
    subject: 'Sorry to see you go!',
    text: `Hi ${recipName}. \n \tWe are sorry to hear you are canceling your account. Please let us know if there are things that would make you change your mind.`,
  });
};

module.exports = { sendWelcomeEmail, sendCancelationEmail };
