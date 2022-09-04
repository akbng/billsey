import connectDB from "../../../config/database";
import { getMemberGroups } from "../../../controllers/group";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { query, method } = req;
  const { uid } = query;
  if (method === "GET") {
    try {
      if (!req.user._id.equals(uid)) throw Error("Wrong user and token");
      const groups = await getMemberGroups(uid);
      return res.status(200).json({ error: false, data: groups });
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
