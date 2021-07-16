import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmpService {

  constructor(private http: HttpClient) { }

  save(value) {
    if (value.userId)
      return this.http.put('empprofile', value);
    else
      return this.http.post('empprofile', value);
  }

  getEmp(keyword) {
    return this.http.get('empprofile', { params: { keyword: keyword } });
  }

  delete(userId) {
    return this.http.delete('empprofile', { params: { userId: userId } });
  }
}
