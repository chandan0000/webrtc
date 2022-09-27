import 'dart:convert';
import 'dart:developer';
import 'package:fwebrtc/utils/user.utils.dart';
import 'package:http/http.dart' as http;

String MEETING_API_URL = "http://192.168.0.67:3000/api/meeting";
var client = http.Client();
Future<http.Response?> startMeeting() async {
  Map<String, String> requestHeaders = {'content-type': 'application/json'};
  var userId = await loadUserId();
  var response = await client.post(Uri.parse('$MEETING_API_URL/start'),
      headers: requestHeaders,
      body: jsonEncode({"hostId": userId, "hostName": ""}));
  if (response.statusCode == 200) {
    log(response.body);
    return response;
  } else {
    return null;
  }
}

Future<http.Response> joinMeeting(String meetId) async {
  var response =
      await http.get(Uri.parse('$MEETING_API_URL/join?meetingId=$meetId'));
  if (response.statusCode == 200) {
    log(response.body);
    return response;
  } else {
    throw UnsupportedError('Not a valid Meeting');
  }
}
