import express from "express";

import {
  createUpdates,
  getUpdates,
  getUpdateById,
  deletdUpdate,
} from "../controllers/updateController.js";

const router = express.Router();

router.get("/", getUpdates);
router.post("/", createUpdates);
router.get("/:id", getUpdateById);
router.delete("/:id", deletdUpdate);

export default router;
