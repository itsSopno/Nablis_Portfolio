import nodemailer from 'nodemailer';

/**
 * Send email notification on new contact message
 */
export const sendContactEmail = async ({ name, email, subject, message }) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;

  // Check if SMTP is configured
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('ℹ️  SMTP not fully configured. Skipping email dispatch. Message is saved in database.');
    return { skipped: true, reason: 'SMTP not configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: EMAIL_TO || SMTP_USER,
      replyTo: email,
      subject: `📬 Portfolio Contact: ${subject || 'New Message from ' + name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">New Message from Portfolio</h2>
          </div>
          <div style="padding: 24px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
            Received from Portfolio Contact Form
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️  Notification email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('⚠️  Failed to send notification email:', error.message);
    return { success: false, error: error.message };
  }
};
