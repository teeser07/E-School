import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Room {
  clas : string;
  classroom : string;
  maxstd : number;
}

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private http: HttpClient) { }

  getRoom() {
    return this.http.get('Room/get-room');
  }
  addRoom(data: Room) {
    return this.http.post('Room/save-room',data);
  }
  deleteRoom(id) {
    return this.http.delete(`Room/delete-room?room_id=${id}`);
  }
  update(id ,data: Room ) {
    return this.http.put(`Room/update-room?room_id=${id}`,data);
  }
  gatDetailRoom(id :any) {
    return this.http.get(`Room/get-room-detail?room_id=${id}`);
  }

}
