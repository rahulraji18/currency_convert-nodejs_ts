import createError from "http-errors";
import express from "express";
import path from "path";
import swaggerUI from "swagger-ui-express";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/routes";
import swaggerDocument from "./module/doc/swaggerWriter";

const app = express();

var options = {
  customCss: ".swagger-ui .topbar { display: none }",
};
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, options)
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

// catch and forward to error handler
app.use(function (req, res, next) {
  next(createError(400).message);
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server listening on ${process.env.PORT}`);
});
