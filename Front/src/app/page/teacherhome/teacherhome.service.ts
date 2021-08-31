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

  getTimeTable(MapClassRoomTeacherId?) {
    if (!MapClassRoomTeacherId) MapClassRoomTeacherId = 0
    return this.http.get('TimeTable​/timetable', { params: { MapClassRoomTeacherId: MapClassRoomTeacherId } });
  }
}
