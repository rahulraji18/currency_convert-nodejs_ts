import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config";
import { NextFunction, RequestHandler } from "express";
const apiKeyValiatior: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const decoded = jwt.verify(req.query.api_key, jwt_secret);
    if (!decoded)
      return next(
        res.status(400).json({ success: false, message: "Invalid token" })
      );
    next();
  } catch (error: any) {
    return next(
      res.status(400).json({ success: false, message: error.message })
    );
  }
};

export default apiKeyValiatior;
