import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, sub, text, html }) =>
  sendgrid.send({
    from: process.env.SENDGRID_SENDER,
    to,
    subject: sub,
    text,
    html,
  });

export default sendEmail;
