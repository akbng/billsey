import connectDB from "../../config/database";
import { signup } from "../../controllers/auth";
import { authenticated } from "../../helper/api/authenticated";

connectDB();

export default authenticated(async function (req, res) {
  const { method } = req;
  if (method === "POST") return signup(req, res);
  return res.status(405).json({
    error: true,
    reason: `${method} request is not allowed for this route`,
  });
});
