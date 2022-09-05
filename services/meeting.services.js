const { meeting } = require('../models/meeting.model');
const { meetingUser } = require('../models/meeting-user.model');
async function getAllMeetingUsers() {
    meetingUser.find({ meetingId: meetId }).then((response) => { return callback(null, response,) }).catch((err) => { return callback(err) });
}

async function startMeeting(params, callback) {
    const meetingSchema = new meeting(params);
    meetingSchema.save().then((response) => { return callback(null, response) }).catch((err) => { return callback(err) });
}

async function joinMeeting(params, callback) {
    meetingUserModel.save().then(async (response) => {
        await meeting.findOneANdUpdate({ id: params.meetingId }, { $addToSet: { meetingUsers: meetingUserModel } })
        return callback(null, response)
    }).catch((err) => { return callback(err); });
}

async function isMeetingPresent(meetingId, callback) {
    meeting.findById(meetingId).populate('meetingUsers', "MeetingUsers").then((response) => {
        if (!response) callback("Invalid Meeting Id");

        else callback(null, true);
    }).catch((err) => { return callback(err) });
}
async function checkMeetingExisits(meetingId, callback) {
    meeting.findById(meetingId, "hostId, hostName, startTime").populate('meetingUsers', "MeetingUsers").then((response) => {
        if (!response) callback("Invalid Meeting Id");

        else callback(null, response);
    }).catch((err) => { return callback(err) });
}
async function getMeetingUser(params, callback) {
    const { meetingId, userId } = params;
    meetingUser.find({ meetingId, userId }).then((response) => {
        return callback(null, response[0]);
    }).catch((err) => { return callback(err) });
}
async function updateMeetingUser(params, callback) {
    meetingUser.updateOne({ userId: params.userId }, { $set: params }, { new: true }).then((response) => {
        return callback(null, response);
    }).catch((err) => { return callback(err) });
}
async function getUserBySocketId(params, callback) {
    const { meetingId, socketId } = params;
    meetingUser.find({ meetingId, socketId }).limit(1).then((response) => {
        return callback(null, response[0]);
    }).catch((err) => { return callback(err) });
}
module.exports = {
    startMeeting,
    joinMeeting,
    getAllMeetingUsers,
    isMeetingPresent,
    checkMeetingExisits,
    getUserBySocketId,
    updateMeetingUser,
    getMeetingUser
};