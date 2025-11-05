import Update from "../models/update.js";

export const getUpdates = async (req, res) => {
  try {
    const filter = {};
    if (req.query.location) {
      filter.location = { $regex: new RegExp(req.query.location, "i") };
    }

    if (req.query.verified) {
      filter.verified = req.query.verified === "true";
    }

    const updates = await Update.find(filter).sort({ createdAt: -1 });
    res.status(200).json(updates);
  } catch (error) {
    console.error("getUpdates error:", error);
    res.status(500).json({ message: "Server error fetching updates" });
  }
};

export const createUpdates = async (req, res) => {
  try {
    const { location, status, description, photoUrl, postedBy, coordinates } =
      req.body;
    if (!location || !status) {
      return res.status(400).json({
        message: "Location and status  are required!",
      });
    }
    const newUpate = new Update({
      location,
      status,
      description,
      photoUrl,
      postedBy,
      coordinates,
    });
    const saved = await newUpate.save();
    res.status(201).json({
      message: "new update created!",
      data: saved,
    });
  } catch (error) {
    console.log("creaateUpdate error", error);
    res.status(500).json({ message: "server errror creating update" });
  }
};

export const getUpdateById = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: "update not found" });
    }
    res
      .status(201)
      .json({ message: "updateByID Fetched successfully!", data: update });
  } catch (error) {
    console.log("error updating by id ===>", error);
    res
      .status(500)
      .json({ message: "error updating by id ", error: error.message });
  }
};

export const deletdUpdate = async (req, res) => {
  try {
    const deleted = await Update.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "update not found" });
    }
    res.status(201).json({ message: "update deleted successfully!" });
  } catch (error) {
    console.log("error deleting update", error);
    res
      .status(500)
      .json({ message: "error deleting update by id ", error: error.message });
  }
};
//  toggle verify for admins , for the time being public access..!

export const verify = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: "update not found" });
    }
    update.verified = !update.verified;
    const saved = await update.save();
    res
      .status(201)
      .json({ message: "verification status updated ", data: saved.verified });
  } catch (error) {
    console.log("error verifing update", error);
    res
      .status(500)
      .json({ message: "error verifing update", error: error.message });
  }
};
