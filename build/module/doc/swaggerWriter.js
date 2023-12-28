"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const bluebird_1 = __importDefault(require("bluebird"));
const fs_1 = __importDefault(require("fs"));
const fs = bluebird_1.default.promisifyAll(fs_1.default);
let schema = ["http", "https"];
// swagger definition
var swaggerDefinition = {
    info: {
        title: "Currency Converter : API Documentation",
        version: "1.0",
        contact: "rahulrajesh474@gmail.com",
        description: "There are the api documentation for the Currency Converter System",
    },
    host: `localhost:${process.env.PORT}`,
    basePath: "/",
    schemes: [...schema],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
};
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ["./src/api/index.ts"],
};
// initialize swagger-jsdoc
const swaggerJson = swagger_jsdoc_1.default(options);
// module.exports = swaggerJson
exports.default = swaggerJson;
