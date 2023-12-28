"use strict";
// import mongoose, { connection } from "mongoose";
// let mongodb_url: any = "";
// if (process.env.MONGODB_URL) mongodb_url = process.env.MONGODB_URL;
// // Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error : ${err.message}`);
//   console.log("Shutting Down The Server Due To Uncaught Exception");
//   process.exit(1);
// });
// mongoose.connect(mongodb_url).then((db) => {
//   console.log(`Mongodb connected with server: ${db.connection.host}`);
// });
// mongoose.connection.on("connected", () => {
//   console.log("Mongoose conPORTnected to db");
// });
// mongoose.connection.on("error", (err) => {
//   console.log(err.message);
// });
// mongoose.connection.on("disconnected", () => {
//   console.log("Mongoose connection disconnected");
// });
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   process.exit(0);
// });
// //Unhandled promise rejection
// process.on("unhandledRejection", (err: any) => {
//   console.log(`Error : ${err.message}`);
//   console.log("Shutting Down The Server Due To Unhandled Promise Rejection");
//   // mongoose.connection.close(()=>process.exit(1))
//   const closeCallback: any = (err?: any) => {
//     if (err) {
//       console.error("Error closing Mongoose connection:", err);
//       process.exit(1); // or handle the error appropriately
//     }
//     console.log("Mongoose connection closed successfully");
//     process.exit(0);
//   };
//   // Call the close method with the custom callback
//   connection.close(closeCallback);
// });
