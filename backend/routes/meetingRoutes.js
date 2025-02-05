const express = require("express");
const {
  createMeeting,
  getMeeting,
  joinMeeting,
  leaveMeeting,
} = require("../controller/meetingController");

const router = express.Router();

// Middleware to validate meetingId
const validateMeetingId = (req, res, next) => {
  if (!req.params.meetingId) {
    return res.status(400).json({ error: "Meeting ID is required" });
  }
  next();
};

// Middleware to validate request body
const validateRequestBody = (req, res, next) => {
  if (!req.body.meetingId || !req.body.userId) {
    return res.status(400).json({ error: "Meeting ID and User ID are required" });
  }
  next();
};

router.post("/create-meeting", createMeeting);
router.get("/meetings/:meetingId", validateMeetingId, getMeeting);
router.post("/join-meeting", validateRequestBody, joinMeeting);
router.post("/leave-meeting", validateRequestBody, leaveMeeting);

module.exports = router;
module.exports = router;