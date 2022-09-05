import connectDB from "../../../config/database";
import { pushNotification } from "../../../controllers/user";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    const { notifications, userId } = req.body;
    try {
      const user = await pushNotification({
        userId,
        notifications,
      });
      return res.status(200).json({ error: false, data: user });
    } catch (err) {
      return res
        .status(400)
        .json({ error: true, reason: err.reason || err.message });
    }
  }
  return res.status(405).json({
    error: true,
    reason: `${method} request is not allowed for this route`,
  });
});
