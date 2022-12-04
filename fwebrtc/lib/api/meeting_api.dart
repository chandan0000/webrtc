import 'dart:convert';
import 'dart:developer';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:fwebrtc/constans.dart';
import 'package:fwebrtc/utils/user.utils.dart';
import 'package:http/http.dart' as http;
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

Dio dio = Dio();

String MEETING_API_URL = "http://$hosturl:3000/api/meeting";
var client = http.Client();
Future<Response?> startMeeting() async {
  dio.interceptors.add(PrettyDioLogger());
  Map<String, String> requestHeaders = {
    'content-type': 'application/json',
  };
  var userId = await loadUserId();

  // var response = await client.post(
  //   Uri.parse('$MEETING_API_URL/start'),
  //   headers: requestHeaders,
  //   body: jsonEncode({"hostId": userId, "hostName": ""}),
  // );
  try {
    var response = await dio.post('$MEETING_API_URL/start',
        data: {"hostId": userId, "hostName": ""});

    if (response.statusCode == 200) {
      log(response.data);
      return response;
    } else {
      return null;
    }
  } catch (e) {
    print(e);
  }
}

Future<http.Response> joinMeeting(String meetId) async {
  var response =
      await http.get(Uri.parse('$MEETING_API_URL/join?meetingId=$meetId'));
  if (response.statusCode >= 200 && response.statusCode < 400) {
    log(response.body);
    return response;
  } else {
    throw UnsupportedError('Not a valid Meeting');
  }
}
