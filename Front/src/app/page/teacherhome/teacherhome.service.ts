import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherhomeService {

  constructor(private http: HttpClient) { }

  getTeacher(Emp_code?) {
    if (!Emp_code) Emp_code = null
    return this.http.get('EmpProfile', { params: { Emp_code: Emp_code } });
  }

  getRoom(MapClassRoomTeacherId?) {
    if (!MapClassRoomTeacherId) MapClassRoomTeacherId = 0
    return this.http.get('MapClassRoomTeacher/get-detail', { params: { MapClassRoomTeacherId: MapClassRoomTeacherId } });
  }

  getSubjects(SubjectTeacherId?){
    if(!SubjectTeacherId) SubjectTeacherId = 0
    return this.http.get('Subject/get-subject-detail', {params:{SubjectTeacherId:SubjectTeacherId}});
  }
  getTimetable(DayValue?,SubjectId?){
    if (!DayValue) DayValue = null
    else if (!SubjectId) SubjectId = 0
    return this.http.get('TimeTable/timetableteacher',{params: { DayValue: DayValue ,SubjectId:SubjectId}})
  }
}
