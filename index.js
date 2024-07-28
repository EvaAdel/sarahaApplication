import express from "express";
import { config } from "dotenv";
import mountRoutes from "./src/mount.routes.js";
import { db_connection } from "./DB/connection.js";
import { errorHandlerResponse } from "./src/middlewares/error-handling-middleware.js";
import { errorHandlingClass } from "./src/utils/error-class.utils.js";
import { xss } from "express-xss-sanitizer";

const app = express();

config();

const port = process.env.PORT; 

app.use(express.json({ limit: "5mb" }));

app.use(xss());

mountRoutes(app);

app.use(errorHandlerResponse);

db_connection();

app.get("/", (req, res) => res.send("Hello World!"));

app.all("*", (req, res, next) => {
  // Create error and send it to error handler middleware
  next(
    new errorHandlingClass(`Can't find ${req.originalUrl} on this server!`, 400)
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

