import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, sub, text, html }) => {
  try {
    await sendgrid.send({
      from: process.env.SENDGRID_SENDER,
      to,
      subject: sub,
      text,
      html,
    });
  } catch (err) {
    throw err;
  }
};

export default sendEmail;
