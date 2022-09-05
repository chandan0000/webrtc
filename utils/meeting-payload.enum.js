const MeetingPayLoadEnum = {
    JOIN_MEETING: 'join-Meeting',
    JOINED_MEETING: 'joined-Meeting',
    USER_JOINED_MEETING: 'user-joined',
    CONNECTION_REQUEST: 'connection-request',
    INCOMING_CONNECTION_REQUEST: 'incoming-connection-request',

    OFFER_SDP: 'offer-sdp',
    ANSWER_SDP: 'answer-sdp',
    LEAVE_SDP: 'leave-sdp',
    LEAVE_MEETING: 'leave-meeting',
    END_MEETING: 'end-meeting',
    USER_LEFT: 'user-left-meeting',
    MEETING_ENDED: 'meeting-ended',
    ICECANDIDATE: 'icecandidate',
    VIDEO_TOOGLE: 'video-toogle',
    AUDIO_TOOGLE: 'aduio-toogle',
    NOT_FOUND: 'not-found',
    UNKNOWN: 'unknown',



}
module.exports = MeetingPayLoadEnum;