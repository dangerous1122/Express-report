import express from "express";
import "dotenv/config";
const app = express();
import dotenv from "dotenv";
import connection from "./config/database.js";
import accessRouter from "./router/accessRouter.js";
import dataRouter from "./router/dataRoutes.js";
import fileRouter from "./router/fileRoutes.js";
import cors from "cors";
dotenv.config();
const port = 5000;
connection().catch((error) => console.log(error));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/", accessRouter);
app.use('/',dataRouter);
app.use('/',fileRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
