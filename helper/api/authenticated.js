import { verifyJwt } from "../../lib/jwt";

export const authenticated = (fn) => async (req, res) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    )
      throw Error("Not Authorized!");

    const decodedPayload = await verifyJwt(
      req.headers.authorization.split(" ")[1]
    );

    req.sub = decodedPayload.sub;

    fn(req, res);
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, reason: error.reason || error.message });
  }
};
