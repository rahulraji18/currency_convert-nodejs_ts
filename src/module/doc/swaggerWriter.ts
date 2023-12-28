import swaggerJSDoc from "swagger-jsdoc";
import Promise, { any } from "bluebird";
import Fs from "fs";
const fs = Promise.promisifyAll(Fs);

let schema = ["http", "https"];

// swagger definition
var swaggerDefinition = {
  info: {
    title: "Currency Converter : API Documentation",
    version: "1.0",
    contact: "rahulrajesh474@gmail.com",
    description:
      "There are the api documentation for the Currency Converter System",
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
var options: any = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./src/api/index.ts"],
};
// initialize swagger-jsdoc
const swaggerJson = swaggerJSDoc(options);

// module.exports = swaggerJson
export default swaggerJson;
