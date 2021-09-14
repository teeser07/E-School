import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudenthomeService {

  constructor(private http: HttpClient) { }

  getStudent(Student_code?) {
    if (!Student_code) Student_code = null
    return this.http.get('Student_profile_/get-profile', { params: { Student_code: Student_code } });
  }

  getRoom(MapClassRoomTeacherId?) {
    if (!MapClassRoomTeacherId) MapClassRoomTeacherId = 0
    return this.http.get('MapClassRoomTeacher/get-detail', { params: { MapClassRoomTeacherId: MapClassRoomTeacherId } });
  }

  getTimeTableInClass(DayValue?,MapClassRoomTeacherId?){
    if (!DayValue) DayValue = null
    else if (!MapClassRoomTeacherId) MapClassRoomTeacherId = null
    return this.http.get('TimeTable/timetabledetail',{ params: { DayValue: DayValue ,MapClassRoomTeacherId:MapClassRoomTeacherId} })
  }

  getSubjectList(MapClassRoomTeacherId?){
    if(!MapClassRoomTeacherId) MapClassRoomTeacherId = null
    return this.http.get('Subject/subjectlist',{params: { MapClassRoomTeacherId:MapClassRoomTeacherId}})
  }

  getStudentLink(MapClassRoomTeacherId?){
    if(!MapClassRoomTeacherId) MapClassRoomTeacherId = null 
    return this.http.get('OnlineClassroom/get-link',{params :{MapClassRoomTeacherId:MapClassRoomTeacherId}})
  }
}
