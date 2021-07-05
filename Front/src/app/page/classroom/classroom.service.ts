import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }

  getRoom() {
    return this.http.get('Room/get-room');
  }
  addRoom(data) {
    return this.http.post<any>('Room/save-room',{data});
  }
  deleteRoom(id) {
    return this.http.disableApiPrefix().delete<any[]>('Room/delete-room'+id);
}

}
