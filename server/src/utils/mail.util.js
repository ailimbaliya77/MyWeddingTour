import nodemailer from "nodemailer";

const EMAIL = process.env.SMTP_EMAIL;
const PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const sendVerificationEmail = async (to, subject, html) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Celeb-ind" <no-reply@celeb-ind.com>`,
    to,
    subject,
    html,
  });
};
