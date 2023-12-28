"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const converter_1 = require("../helpers/converter");
const apiKeyValidator_1 = __importDefault(require("../middlewares/apiKeyValidator"));
// api-key generation api
router.get("/generate-key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expiresIn = req.query.expires_In;
        const api_key = jsonwebtoken_1.default.sign({ date: Date.now() }, config_1.jwt_secret, {
            expiresIn: expiresIn,
        });
        res.status(200).json({
            sucess: true,
            message: "Successfully generated api key",
            api_key,
        });
    }
    catch (error) {
        res.status(400).json({ sucess: false, message: "Something went wrong!" });
    }
}));
// currency conversion api
router.get("/convert", apiKeyValidator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, amount } = req.query;
        let convert;
        if (!from || !to || !amount)
            return res.status(200).json({
                sucess: true,
                message: `Missing Parameters`,
            });
        yield converter_1.converter(amount, from, to).then((value) => {
            convert = value;
        });
        res.status(200).json({
            sucess: true,
            message: `Successfully converted amount from ${from} to ${to}`,
            details: convert,
        });
    }
    catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Something went wrong!",
        });
    }
}));
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
exports.default = api;
