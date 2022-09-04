import connectDB from "../../config/database";
import { getAllUsers } from "../../controllers/user";
import { authenticated } from "../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const users = await getAllUsers();
      return res.status(200).json({
        error: false,
        data: users.filter(
          (user) =>
            !user._id.equals(req.user._id) &&
            !req.user.friends.includes(user._id)
        ),
      });
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
