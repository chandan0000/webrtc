// ignore_for_file: public_member_api_docs, sort_constructors_first
class MeetingDetails {
  String? id;
  String? hostId;
  String? hostName;
  MeetingDetails({
    this.id,
    this.hostId,
    this.hostName,
  });
  factory MeetingDetails.fromJson(Map<String, dynamic> json) {
    return MeetingDetails(
      id: json['id'],
      hostId: json['hostId'],
      hostName: json['hostName'],
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'hostId': hostId,
      'hostName': hostName,
    };
  }
}
