import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private http: HttpClient) { }

  getDay(){
    return this.http.get('Days/get-days');
  }

  deleteDay(id:any){
    return this.http.delete(`Days/delete-days?days_id=${id}`);
  }

  saveDay(data:any){
    return this.http.post('Days/save-days',data)
  }

  getDayDetail(id:any){
    return this.http.get(`Days/get-days-detail?days_id=${id}`)
  }

  updateDay(id:any,data:any){
    return this.http.put(`Days/update-days?days_id=${id}`,data)
  }
}
