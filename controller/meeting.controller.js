const meetingServices = require('../services/meeting.services');
const startMeeting = (req, res, next) => {
    const { hostId, hostName } = req.body;
    var model = {
        hostId: hostId,
        hostName: hostName,
        startTime: new Date.now()
    };
    meetingServices.startMeeting(model, (err, results) => {
        if (error) {
            return next(err);
        }
        return res.status(200).send({ message: "Success", data: results.id, })
    });
}
const checkMeetingExists = (req, res, next) => {
    const { meeting } = req.body;
    meetingServices.checkMeetingExisits(meetingId, (error, results) => {
        if (error) {
            return next(err);
        }
        return res.status(200).send({ message: "Success", data: results, })
    });
}
const getAllMeetingUsers = (req, res, next) => {
    const { meetingId } = req.query;
    meetingServices.getAllMeetingUsers(meetingId, (err, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({ message: "Success", data: results, })
    });
};
module.exports = { startMeeting , checkMeetingExists, getAllMeetingUsers};