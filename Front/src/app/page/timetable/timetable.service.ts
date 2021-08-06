import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient) { }

  getTimetable(mapclassroomteacherId?){
    if (!mapclassroomteacherId) mapclassroomteacherId = 0
    return this.http.get('TimeTable/timetable',{ params: { mapclassroomteacherId: mapclassroomteacherId } });
  }

  getClass(keyword){
    return this.http.get('MapClassRoomTeacher/get-mcrt',{ params: { keyword: keyword } });
  }

  getTime(keyword){
    return this.http.get('Period/get-period',{ params: { keyword: keyword } });
  }

  getSubject(keyword){
    return this.http.get('Subject/get-subject',{ params: { keyword: keyword } });
  }
  
  save(value) {
    if (value.timeTableId)
      return this.http.put('TimeTable/update-tb', value);
    else
      return this.http.post('TimeTable/save-tb', value);
  }

  deleteTimetable(timeTableId){
    return this.http.delete('TimeTable/timetable',{ params: { timeTableId: timeTableId } });
  }
}
