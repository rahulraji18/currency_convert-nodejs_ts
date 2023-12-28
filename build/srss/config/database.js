"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
let mongodb_url = "";
if (process.env.MONGODB_URL)
    mongodb_url = process.env.MONGODB_URL;
// Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down The Server Due To Uncaught Exception");
    process.exit(1);
});
mongoose_1.default.connect(mongodb_url).then((db) => {
    console.log(`Mongodb connected with server: ${db.connection.host}`);
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongoose connected to db");
});
mongoose_1.default.connection.on("error", (err) => {
    console.log(err.message);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose connection disconnected");
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    process.exit(0);
}));
//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down The Server Due To Unhandled Promise Rejection");
    // mongoose.connection.close(()=>process.exit(1))
    const closeCallback = (err) => {
        if (err) {
            console.error("Error closing Mongoose connection:", err);
            process.exit(1); // or handle the error appropriately
        }
        console.log("Mongoose connection closed successfully");
        process.exit(0);
    };
    // Call the close method with the custom callback
    mongoose_1.connection.close(closeCallback);
});
