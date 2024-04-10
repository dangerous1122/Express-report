import express from "express";
const accessRouter = express.Router();
import {
  deleteAcc,
  googleAuth,
  login,
  register,
  validate,
} from "../controller/accessController.js";
import authenticateToken from "../middleware/authMiddleware.js";

accessRouter.post("/login", login);
accessRouter.post("/register", register);
accessRouter.get("/validate", authenticateToken, validate);
accessRouter.post("/google-auth", googleAuth);
accessRouter.delete("/delete-account", authenticateToken, deleteAcc);

export default accessRouter;
