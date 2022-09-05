const meetingHelper = require('./utils/meeting-helper');
const { MeeetingPayLoadEnum } = require('./utils/meeting-payload.enum');
function parseMessage(message) {
    try {
        const payload = JSON.parse(message);
        return payload;
    } catch (e) {
        return { type: MeeetingPayLoadEnum.UNKNOWN };
    }
}
function listenMessage(meetingId, socket, meetingServer) {
    socket.on('message', (message) => handleMessage(meetingId, socket, message, meetingServer));
}
function handleMessage(meetingId, socket, message, meetingServer) {
    var payload = "";
    if (typeof message === 'string') {
        payload = parseMessage(message);
    } else {
        payload = message;
    }
    switch (payload.type) {
        case MeeetingPayLoadEnum.JOIN_MEETING:
            meetingHelper.joinMeeting(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.CONNECTION_REQUEST:
            meetingHelper.forwardConnectionRequest(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.OFFER_SDP:
            meetingHelper.forwardOfferSDP(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.ICE_CANDIDATE:
            meetingHelper.forwardIceCandidate(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.ANSWER_SDP:
            meetingHelper.forwarAnswerSDP(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.LEAVE_MEETING:
            meetingHelper.userLeft(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.END_MEETING:
            meetingHelper.endMeeting(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.VIDEOTOGGLE:
            meetingHelper.forwardEvent(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.AUDIOTOGGLE:
            meetingHelper.forwardEvent(meetingId, socket, meetingServer, payload);
            break;
        case MeeetingPayLoadEnum.UNKNOWN:
            break;

        default:
            break;
    }
}

function initMeetingServer(server) {
    const meetingServer = require('socket.io')(server);
    meetingServer.on('connection', (socket) => {
        const meetingId = socket.handshake.query.id;
        listenMessage(meetingId, socket, meetingServer);
    });
}
module.exports = {
    initMeetingServer
}