import connectDB from "../../../../config/database";
import { addMembersToGroup } from "../../../../controllers/group";
import { authenticated } from "../../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    const { groupId, members } = req.body;
    try {
      const group = await addMembersToGroup({ groupId, members });
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
