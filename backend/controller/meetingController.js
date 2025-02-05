const Meeting = require("../models/Meeting");

// Create a new meeting
exports.createMeeting = async (req, res) => {
    try {
        const { meetingId } = req.body;

        if (!meetingId) {
            return res.status(400).json({ error: "Meeting ID is required" });
        }

        const meeting = new Meeting({ meetingId, users: [] });
        await meeting.save();

        res.status(201).json({ success: true, meetingId: meeting.meetingId });
    } catch (error) {
        console.error("Error creating meeting:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get meeting details
exports.getMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        const meeting = await Meeting.findOne({ meetingId });

        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }

        res.json(meeting);
    } catch (error) {
        console.error("Error retrieving meeting:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Join a meeting
exports.joinMeeting = async (req, res) => {
    try {
        const { meetingId, userId } = req.body;

        if (!meetingId || !userId) {
            return res.status(400).json({ error: "Meeting ID and User ID are required" });
        }

        const meeting = await Meeting.findOne({ meetingId });

        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }

        if (!meeting.users.includes(userId)) {
            meeting.users.push(userId);
            await meeting.save();
        }

        res.json({ success: true, message: "User added to the meeting", users: meeting.users });
    } catch (error) {
        console.error("Error joining meeting:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Leave a meeting
exports.leaveMeeting = async (req, res) => {
    try {
        const { meetingId, userId } = req.body;

        if (!meetingId || !userId) {
            return res.status(400).json({ error: "Meeting ID and User ID are required" });
        }

        const meeting = await Meeting.findOne({ meetingId });

        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }

        meeting.users = meeting.users.filter(id => id !== userId);
        await meeting.save();

        res.json({ success: true, message: "User removed from the meeting", users: meeting.users });
    } catch (error) {
        console.error("Error leaving meeting:", error);
        res.status(500).json({ error: "Server error" });
    }
};
