import connectDB from "../../../config/database";
import { createGroup } from "../../../controllers/group";
import { authenticated } from "../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { name, description, tags, members } = req.body;
    try {
      if (!Array.isArray(tags)) throw Error("tags should be an array");
      if (!Array.isArray(members)) throw Error("members should be an array");
      const group = await createGroup({
        name,
        description,
        tags,
        members,
        creator: req.user._id,
      });
      return res.status(200).json({ error: false, data: group });
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
