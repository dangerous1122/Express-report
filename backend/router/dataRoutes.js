import express from "express";
import {
  addReceiverData,
  addSenderData,
  deleteReceiverData,
  deleteSenderData,
  updateReceiverData,
  updateSenderData,
  getReceiverData,
  getSenderData,
  fileUpload,
  profileData,
  sendMail,
} from "../controller/dataController.js";
import multer from "multer";
import authenticateToken from "../middleware/authMiddleware.js";
import { confirmPayment, stripePayment } from "../controller/paymentController.js";
const dataRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

dataRouter.post(
  "/file-upload",
  upload.single("file"),
  authenticateToken,
  fileUpload
);
dataRouter.post("/add-sender", authenticateToken, addSenderData);
dataRouter.post("add-receiver", authenticateToken, addReceiverData);
dataRouter.delete("/delete-sender/:id", authenticateToken, deleteSenderData);
dataRouter.delete(
  "/delete-receiver/:id",
  authenticateToken,
  deleteReceiverData
);
dataRouter.patch("/edit-sender/:id", authenticateToken, updateSenderData);
dataRouter.patch("edit-receiver/:id", authenticateToken, updateReceiverData);
dataRouter.get("/get-senders/:add", authenticateToken, getSenderData);
dataRouter.get("/get-receivers/:add", authenticateToken, getReceiverData);
dataRouter.post("/doc-upload", upload.single("file"),authenticateToken, fileUpload);
dataRouter.post("/payment-intent", authenticateToken, stripePayment);
dataRouter.get('/confirm-status',authenticateToken,confirmPayment)
dataRouter.get("/get-data", authenticateToken, profileData);
dataRouter.post('/send-mail',authenticateToken,sendMail)

export default dataRouter;
