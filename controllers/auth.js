import { issueJwt } from "../lib/jwt";
import sendEmail from "../lib/sendEmail";
import User from "../models/User";
import { makeObject } from "../utils";

const sendVerifyMail = async (email) => {
  const sub = "Verify Your Email Address";
  const token = issueJwt({ email });
  const text = `Go to the link below to verify your email: http://localhost:3000/signup?tok=${token.token}`;
  const msg = `Click on the <a href="http://localhost:3000/signup?tok=${token.token}">link to verify your email</a> or <strong>paste the link</strong> in your browser: http://localhost:3000/signup?tok=${token.token}`;
  await sendEmail({ to: email, sub, text, html: msg });
};

export const signin = async (req, res) => {
  if (!req.body || !req.body.email)
    return res.status(400).json({
      error: true,
      reason: "There is no data/body in the request",
    });

  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("_id name email");
    if (!user) {
      await sendVerifyMail(email);
      return res
        .status(200)
        .json({ error: false, data: user, message: "Email sent successfully" });
    }

    if (req.body.password) {
      const isValid = await user.authenticate(req.body.password);
      if (!isValid)
        return res.status(400).json({
          error: true,
          reason: "Email and password do not match",
        });

      const token = issueJwt({ user });
      return res.status(200).json({ error: false, data: { ...token, user } });
    }

    return res.status(200).json({ error: false, data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, reason: err.reason || err.message });
  }
};

export const signup = async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      error: true,
      reason: "There is no data/body in the request",
    });

  const { name, fullName, email, password, phone, address } = req.body;

  if (email !== req.sub)
    return res
      .status(401)
      .json({ error: true, reason: "wrong email provided" });

  const user = User(
    makeObject({
      name,
      fullName,
      email,
      password,
      phone,
      address,
      verified: true,
    })
  );

  try {
    const newUser = await user.save({ validateBeforeSave: true });
    const token = issueJwt({ user: newUser });
    // hide the sensitive information
    newUser.hashed_password = undefined;
    newUser.salt = undefined;

    return res.json({
      error: false,
      data: {
        ...token,
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      reason: err.reason || err.message,
    });
  }
};
