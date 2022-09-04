import connectDB from "../../../config/database";
import { getGroupById, removeGroupById } from "../../../controllers/group";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;
  const { gid } = req.query;
  if (method === "GET") {
    try {
      const group = await getGroupById(gid);
      return res.status(200).json({ error: false, data: group });
    } catch (err) {
      return res
        .status(400)
        .json({ error: true, reason: err.reason || err.message });
    }
  }
  if (method === "DELETE") {
    try {
      const data = await removeGroupById(gid);
      return res.status(200).json({ error: false, data });
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
