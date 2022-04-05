import { CognitoJwtVerifier } from "aws-jwt-verify";
import awsExports from "../../src/aws-exports.js";

const verifier = CognitoJwtVerifier.create({
  userPoolId: awsExports.aws_user_pools_id,
  tokenUse: "access",
  clientId: awsExports.aws_user_pools_web_client_id,
});

export const authorizer = async (req, res, next) => {
  console.log(req.headers);
  console.log(req.body);
  let jwtToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    jwtToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(401).send({ error: "Unauthorized" });
  }

  try {
    await verifier.verify(jwtToken);
    next();
  } catch {
    console.error("Token is not valid!");
    return res.status(401).send({ error: "Auth token is not valid!" });
  }
};
