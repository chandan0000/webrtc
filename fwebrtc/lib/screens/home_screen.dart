import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:fwebrtc/api/meeting_api.dart';
import 'package:fwebrtc/model/meeting_details.dart';
import 'package:http/http.dart';
import 'package:snippet_coder_utils/FormHelper.dart';

import 'join_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static final GlobalKey<FormState> globalKey = GlobalKey<FormState>();

  String meetingId = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meeting App'),
        backgroundColor: Colors.red,
        centerTitle: true,
      ),
      body: Form(key: globalKey, child: formUI()),
    );
  }

  Widget formUI() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Welcome to WebRtc Meeting App',
              maxLines: 1,
              style: TextStyle(
                  fontSize: 25,
                  color: Colors.black,
                  fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            FormHelper.inputFieldWidget(
              context,
              "meetingId",
              "Enter your Meeting Id",
              (val) {
                if (val.isEmpty) {
                  return 'Please enter your Meeting Id';
                }

                return null;
              },
              (onSaved) {
                meetingId = onSaved;
              },
              borderRadius: 10,
              borderColor: Colors.red,
              hintColor: Colors.grey,
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Flexible(
                  child: FormHelper.submitButton(
                    'Join Meeting',
                    () async {
                      log("join meeting");
                      if (validateAndSave()) {
                        validateMeeting(meetingId);
                      }
                    },
                  ),
                ),
                Flexible(
                  child: FormHelper.submitButton(
                    'Start Meeting',
                    () async {
                      log("start meeting");
                      var response = await startMeeting();
                      final body = response!.data;
                      final meetingId = body['data'];
                      validateMeeting(meetingId);
                    },
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  void validateMeeting(String meetingId) async {
    try {
      var response = await joinMeeting(meetingId);
      var data = response.data;
      final meetingDetails = MeetingDetails.fromJson(data);
      // gotoMeetingScreen(meetingDetails);
    } catch (e) {
      FormHelper.showSimpleAlertDialog(
          context, "Meeting App", "Invalid Meeting Id", "Ok", () {
        Navigator.pop(context);
      });
      log(e.toString());
    }
  }

  goToJoinScreen(MeetingDetails meetingDetails) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) {
        return JoinScreen(meetingDetails: meetingDetails);
      }),
    );
  }

  bool validateAndSave() {
    final form = globalKey.currentState;
    if (form!.validate()) {
      form.save();
      return true;
    }
    return false;
  }
}
