import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnlineClassService {

  constructor(private http: HttpClient) { }

  getLink(MapClassRoomTeacherId?) {
    if (!MapClassRoomTeacherId) MapClassRoomTeacherId = 0
    return this.http.get('OnlineClassroom/get-link', { params: { MapClassRoomTeacherId: MapClassRoomTeacherId } });
  }

  save(value) {
    if (value.onlineClassroomId)
      return this.http.put('OnlineClassroom/update-link', value);
    else
      return this.http.post('OnlineClassroom/save-homework', value);
  }

  deleteLink(onlineClassroomId){
    return this.http.delete('OnlineClassroom/delete-link',{ params: { OnlineClassroomId: onlineClassroomId } });
  }

}
