import { mailtrapClient, sender } from './emails.js';
import { VERIFICATION_EMAIL_TEMPLATE } from './template_emails.js';

export const sendVerificationEmail = async (user, verificationToken) => {
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
