import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { getReceipts, deleteFile, getReceiptsById, makePdf } from "../controller/fileController.js";
const fileRouter = express.Router();

fileRouter.delete("/del-file/:id", authenticateToken, deleteFile);
fileRouter.get("/get-files", authenticateToken, getReceipts);
fileRouter.get("/get-files/:id", authenticateToken, getReceiptsById);
fileRouter.post('/pdf/:data',authenticateToken,makePdf)

export default fileRouter;
