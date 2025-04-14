import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: 'hello@demomailtrap.co',
  name: 'Oerd Bej ',
};

//recipients should be dynamic later from the user that is signed up. TESTING
const recipients = [
  {
    email: 'opencode03@gmail.com',
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: 'You are awesome!',
    text: 'Congrats for sending test email with Mailtrap!',
    category: 'Integration Test',
  })
  .then(console.log, console.error);
