const express = require("express");
const { createMeeting, getMeeting, joinMeeting, leaveMeeting } = require("../controller/meetingController");

const router = express.Router();

router.post("/create-meeting", createMeeting);
router.get("/meetings/:meetingId", getMeeting);
router.post("/join-meeting", joinMeeting);
router.post("/leave-meeting", leaveMeeting);

module.exports = router;
 