import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:fwebrtc/api/meeting_api.dart';
import 'package:fwebrtc/screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  var a = await joinMeeting('123');
  log(a.toString());

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Meeting App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}
