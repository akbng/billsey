import connectDB from "../../config/database";
import { getFriends } from "../../controllers/user";
import { authenticated } from "../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const { friends } = await getFriends(req.user._id);
      return res.status(200).json({ error: false, data: friends });
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
