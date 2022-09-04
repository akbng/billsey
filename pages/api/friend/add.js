import connectDB from "../../../config/database";
import { addFriend } from "../../../controllers/user";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    const { friendId } = req.body;
    try {
      const user = await addFriend({ userId: req.user._id, friendId });
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
