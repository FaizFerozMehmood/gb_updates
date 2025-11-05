import express from "express";

import {
  createUpdates,
  getUpdates,
  getUpdateById,
  deletdUpdate,
  verify,
} from "../controllers/updateController.js";

const router = express.Router();

router.get("/", getUpdates);
router.post("/", createUpdates);
router.get("/:id", getUpdateById);
router.delete("/:id", deletdUpdate);
router.put("/:id/verify", verify);

export default router;
