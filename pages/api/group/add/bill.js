import connectDB from "../../../../config/database";
import { addBillToGroup } from "../../../../controllers/group";
import { authenticated } from "../../../../helper/api/authenticated";

connectDB();

export default authenticated(async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    const { groupId, bill } = req.body;
    try {
      const group = await addBillToGroup({ groupId, bill });
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
