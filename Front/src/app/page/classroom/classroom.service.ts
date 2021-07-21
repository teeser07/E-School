import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private http: HttpClient) { }

  getRoom(keyword) {
    return this.http.get('MapClassRoomTeacher/get-mcrt', { params: { keyword: keyword }});
  }
  save(value) {
    if (value.mapclassroomteacherId)
    return this.http.put('MapClassRoomTeacher/update-mcrt',value);
    else
    return this.http.post('MapClassRoomTeacher/save-mcrt',value);
  }
  deleteRoom(mapclassroomteacherId) {
    return this.http.delete('MapClassRoomTeacher/delete-mcrt', { params: { mapclassroomteacherId: mapclassroomteacherId }});
  }

  getEmp(key) {
    return this.http.get('MapClassRoomTeacher/get-emp', { params: { key: key } });
  }
}
