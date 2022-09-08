const meetingController = require('../controller/meeting.controller');
const express = require('express');
const router = express.Router();
router.post('/start', meetingController.startMeeting);
router.post('/meeting/join', meetingController.checkMeetingExists);
router.get('/meeting/get', meetingController.getAllMeetingUsers);
module.exports = router;