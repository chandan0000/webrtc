import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';

import '../model/meeting_details.dart';

class JoinScreen extends StatefulWidget {
  final MeetingDetails? meetingDetails;
  const JoinScreen({super.key, this.meetingDetails});

  @override
  State<JoinScreen> createState() => _JoinScreenState();
}

class _JoinScreenState extends State<JoinScreen> {
  String userName = "";
  static final GlobalKey<FormState> globalKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Join Meeting'),
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
            const SizedBox(height: 20),
            FormHelper.inputFieldWidget(
              context,
              "userId",
              "Enter your Name",
              (val) {
                if (val.isEmpty) {
                  return 'Name can`t be empty';
                }

                return null;
              },
              (onSaved) {
                userName = onSaved;
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
                      if (validateAndSave()) {
                        //! Meeting page navigation
                      }
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

  bool validateAndSave() {
    final form = globalKey.currentState;
    if (form!.validate()) {
      form.save();
      return true;
    }
    return false;
  }

  // void validateMeeting(String meetingId) async {
  //   try {
  //     Response response = await joinMeeting(meetingId);
  //     var data = json.decode(response.body);
  //     final meetingDetails = MeetingDetails.fromJson(data);
  //     // gotoMeetingScreen(meetingDetails);
  //   } catch (e) {
  //     FormHelper.showSimpleAlertDialog(
  //         context, "Meeting App", "Invalid Meeting Id", "Ok", () {
  //       Navigator.pop(context);
  //     });
  //     log(e.toString());
  //   }
  // }
}
