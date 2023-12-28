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
        title: "SHOP : API Documentation",
        version: "1.0",
        contact: "admin@gmail.com",
        description: "There are the api documentation for the student management system",
    },
    host: `localhost:3000`,
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
    apis: [
        "./controllers/user/index.js",
        "./controllers/product/index.js",
        "./controllers/order/index.js",
    ],
};
// initialize swagger-jsdoc
const swaggerJson = swagger_jsdoc_1.default(options);
fs.writeFileAsync("./public/swagger.json", JSON.stringify(swaggerJson, null, 2))
    .then(function (rs) { })
    .catch(function (err) {
    console.log(err);
});
// module.exports = swaggerJson
exports.default = swaggerJson;
