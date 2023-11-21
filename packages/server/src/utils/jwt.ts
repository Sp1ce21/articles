import jwt from "jsonwebtoken";

export function signJwt(object: any, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.JWT_SECRET, {
    ...(options && options),
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
