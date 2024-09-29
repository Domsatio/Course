import jwt from "jsonwebtoken";

export const signJWT = (
  payload: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, process.env.JWT_PRIVATE || "", {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_PUBLIC || "");
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "JWT expired",
      decoded: null,
    };
  }
};
