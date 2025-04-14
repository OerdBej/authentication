import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

//recipients should be dynamic later from the user that is signed up. TESTING
export const mailclient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: 'hello@demomailtrap.co',
  name: 'Oerd Bej ',
};
