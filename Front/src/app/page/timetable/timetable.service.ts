import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private http: HttpClient) { }

  getTimetable(keyword){
    return this.http.get('TimeTable/get-tb',{ params: { keyword: keyword } });
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
    return this.http.delete('TimeTable/delete-tb',{ params: { timeTableId: timeTableId } });
  }
}
