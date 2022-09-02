import { sign, verify } from "jsonwebtoken";
import { resolve } from "path";
import { readFileSync } from "fs";

const pathToPrivKey = resolve(process.env.ROOT, "private.pem");
const pathToPubKey = resolve(process.env.ROOT, "public.pem");

const PRIV_KEY = readFileSync(pathToPrivKey, "utf8");
const PUB_KEY = readFileSync(pathToPubKey, "utf8");

export const issueJwt = ({ user, email }) => {
  const expiresIn = "6h";
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user?._id || email,
    iat: issuedAt,
  };

  const signedToken = sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: signedToken,
    expires: issuedAt + parseInt(expiresIn.split("h")[0]) * 60 * 60,
  };
};

export const verifyJwt = (token) =>
  verify(token, PUB_KEY, { algorithms: ["RS256"] });
