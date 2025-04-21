import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: 'hello@demomailtrap.co',
  name: 'Oerd Bej',
};

export const mailtrapClient = client;

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Request',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetUrl}', resetUrl),
      category: 'Password Reset',
    });
    console.log('Password reset email sent:', response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const sendResetEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Request',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    });
    console.log('Password reset email sent:', response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
