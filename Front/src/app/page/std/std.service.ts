import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StdService {

  constructor(private http: HttpClient) { }

  save(value) {
    if (value.userId)
      return this.http.put('Student_profile_/update-student', value);
    else
      return this.http.post('Student_profile_/save-std', value);
  }
  getStd(keyword) {
    return this.http.get('Student_profile_/get-student-profile', { params: { keyword: keyword } });
  }

  delete(userId) {
    return this.http.delete('Student_profile_/delete-student', { params: { userId: userId } });
  }
}
