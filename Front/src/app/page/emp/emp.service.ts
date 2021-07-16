import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmpService {

  constructor(private http: HttpClient) { }

  save(value) {
    return this.http.post('empprofile', value);
  }

  getEmp(keyword) {
    return this.http.get('empprofile', { params: { keyword: keyword} });
  }
}
