import express, { Request, Response } from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config";
import { converter } from "../helpers/converter";
import apiKeyValiatior from "../middlewares/apiKeyValidator";

// api-key generation api
router.get(
  "/generate-key",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const expiresIn: any = req.query.expires_In;
      const api_key = jwt.sign({ date: Date.now() }, jwt_secret, {
        expiresIn: expiresIn,
      });
      res.status(200).json({
        sucess: true,
        message: "Successfully generated api key",
        api_key,
      });
    } catch (error) {
      res.status(400).json({ sucess: false, message: "Something went wrong!" });
    }
  }
);
// currency conversion api
router.get(
  "/convert",
  apiKeyValiatior,
  async (req: Request, res: Response): Promise<any> => {
    try {
      interface QueryParams {
        from?: any;
        to?: any;
        amount?: any;
      }
      const { from, to, amount }: QueryParams = req.query;
      let convert: any;
      if (!from || !to || !amount)
        return res.status(200).json({
          sucess: true,
          message: `Missing Parameters`,
        });
      await converter(amount, from, to).then((value) => {
        convert = value;
      });
      res.status(200).json({
        sucess: true,
        message: `Successfully converted amount from ${from} to ${to}`,
        details: convert,
      });
    } catch (error) {
      res.status(500).json({
        sucess: false,
        message: "Something went wrong!",
      });
    }
  }
);

//swagger implementation for each apis
/**
 * @swagger
 * /generate-key:
 *  get:
 *    tags:
 *      - Api Key
 *    summary: generate api key
 *    parameters:
 *      - in: query
 *        name: expires_In
 *        description: "expiration {example: 2d => 2 days, 3h => 3 hours}"
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal server error
 */
/**
 * @swagger
 * /convert:
 *  get:
 *    tags:
 *      - Api Key
 *    summary: convert currency based on currency code
 *    parameters:
 *      - in: query
 *        name: api_key
 *        type: string
 *        required: true
 *      - in: query
 *        name: from
 *        description: "from currency code {example: USD => US Doller, INR => Indian Rupee}"
 *        type: string
 *        required: true
 *      - in: query
 *        name: to
 *        description: "to currency code {example: USD => US Doller, INR => Indian Rupee}"
 *        type: string
 *        required: true
 *      - in: query
 *        name: amount
 *        description: "amount"
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal server error
 */
const api = router;
export default api;
