import { mailtrapClient, sender } from './emails.js';
import { VERIFICATION_EMAIL_TEMPLATE } from './template_emails.js';

export const sendVerificationEmail = async (user, verificationToken) => {
  //the argument user is the user object that is created in the signup function
  const recipient = [{ email: user.email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify Your Email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
    });
    console.log('Verification email sent:', response);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Welcome to Our Platform',
      html: WELCOME_EMAIL_TEMPLATE.replace('{name}', name),
    });
    console.log('Welcome email sent:', response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
