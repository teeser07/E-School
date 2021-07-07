import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient) { }

  getTime(){
    return this.http.get('Times/get-times');
  }

  deleteTime(id:any){
    return this.http.delete(`Times/delete-times?times_id=${id}`);
  }

  saveTime(data:any){
    return this.http.post('Times/save-times',data)
  }

  getTimeDetail(id:any){
    return this.http.get(`Times/get-times-detail?times_id=${id}`)
  }

  updateTime(id:any,data:any){
    return this.http.put(`Times/update-times?times_id=${id}`,data)
  }
}
