import nodemailer from "nodemailer";

type SendEmailParams = {
  name: string;
  email: string;
  subject: string;
  recipient: string;
  message: string;
};

export async function sendEmail({
  name,
  email,
  subject,
  recipient,
  message,
}: SendEmailParams): Promise<{ success: boolean; message: string }> {
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Missing required fields",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
