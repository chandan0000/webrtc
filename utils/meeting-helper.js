const meetingServices = require('../services/meeting.services');
const { MeetingPayLoadEnum } = require('./meeting-payload.enum');
async function joinMeeting(meetingId, socket, meetingServer, payload) {
    const { userId, name } = payload.data;
    meetingServices.isMeetingPresent(meetingId, async (error, results) => {
        if (error && !results) {
            sendMessagetoUser(socket, {
                type: MeetingPayLoadEnum.NOT_FOUND,
            });
        }
        if (results) {
            addUser(socket, { meetingId, userId, name }).then((result) => {
                if (result) {
                    sendMessage(socket, {
                        type: MeetingPayLoadEnum.JOINED_MEETING, data: {
                            userId
                        }
                    });


                    broadcatUsers(meetingId, socket, meetingServer, {
                        type: MeetingPayLoadEnum.USER_JOINED, data: {
                            userId,
                            name,
                            ...payload.data
                        }
                    });
                } (error) => {
                    console.log(error);
                }
            })



        }
    });
};



function sendMessagetoUser(socket, payload) {
    socket.send(JSON.stringify(payload));
}
function broadcatUsers(meetingId, socket, meetingServer, payload) {
    socket.broadcast.emit("message", JSON.stringify(payload));
}

function forwardConnectionRequest(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, name } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId
    };
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = JSON.stringify({ type: MeetingPayLoadEnum.CONNECTION_REQUEST, data: { userId, condidate } });
        }
    });
    meetingServer.to(results.socketId).emit("message", sendPayload);
}

function forwardIceCandidate(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, candidate } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId
    };
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = JSON.stringify({ type: MeetingPayLoadEnum.ICECANDIDATE, data: { userId, name, ...payload.data } });
        }
    });
    meetingServer.to(results.socketId).emit("message", sendPayload);
}




function forwardOfferSDP(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, sadp } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId
    };
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = JSON.stringify({ type: MeetingPayLoadEnum.OFFER_SDP, data: { userId, sdp } });
        }
    });
    meetingServer.to(results.socketId).emit("message", sendPayload);
}


function forwarAnswerSDP(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, sadp } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId
    };
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = JSON.stringify({ type: MeetingPayLoadEnum.ANSWER_SDP, data: { userId, sdp } });
        }
    });
    meetingServer.to(results.socketId).emit("message", sendPayload);
}



function userLeft(meetingId, socket, meetingServer, payload) {
    const { userId } = payload.data;
    broadcatUsers(meetingId, socket, meetingServer, {
        type: MeetingPayLoadEnum.USER_LEFT, data: {
            userId: userId
        }
    });

}



function endMeeting(meetingId, socket, meetingServer, payload) {
    const { userId } = payload.data;
    broadcatUsers(meetingId, socket, meetingServer, {
        type: MeetingPayLoadEnum.MEETING_END, data: {
            userId: userId
        }
    });
    meetingServices.getAllMeeting(meetingId, (error, results) => {
        for (let i = 0; i < results.length; i++) {
            const meetingUser = results[i];
            meetingServices.socket.connected[meetingUser.socketId].disconnect();
        }
    });

}



function forwardEvent(meetingId, socket, meetingServer, payload) {
    const { userId } = payload.data;
    broadcatUsers(meetingId, socket, meetingServer, {
        type: payload.type, data: {
            userId: userId,
            ...payload.data
        }
    });


}


function addUser(socket, { meetingId, userId, name }) {
    let promise = new Promise((resolve, reject) => {
        meetingServices.getMeetingUser({ meetingId, userId }, (error, results) => {
            if (!error) {
                var model = {
                    socketId: socket.id,
                    meetingId: meetingId,
                    userId: userId,
                    joined: true,
                    name: name,
                    isAlive: true,
                };
                meetingServices.joinMeeting(model, (error, results) => {
                    if (!error) {
                        resolve(true);
                    }
                    if (error) {
                        reject(error);
                    }
                });
            } else {
                meetingServices.updateMeetingUser({
                    userId: userId,
                    socketId: socket.id,
                }, (error, results) => {
                    if (resolve) {
                        resolve(true);
                    } if (error) {
                        reject(error);
                    }
                }
                )
            }
        });

    });
    return promise;
}


module.exports = {
    joinMeeting,
    forwardConnectionRequest,
    forwardIceCandidate,
    forwardOfferSDP,
    forwarAnswerSDP,
    userLeft,
    endMeeting,
    forwardEvent,
}