import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }

  getHoliday(){
    return this.http.get('Holiday/get-holiday');
  }

  deleteHoliday(id:any){
    return this.http.delete(`Holiday/delete-holiday?holiday_id=${id}`);
  }

  saveHoliday(data:any){
    return this.http.post('Holiday/save-holiday',data)
  }

  getHolidayDetail(id:any){
    return this.http.get(`Holiday/get-holiday-detail?holiday_id=${id}`)
  }

  updateHoliday(id:any,data:any){
    return this.http.put(`Holiday/update-holiday?holiday_id=${id}`,data)
  }
}
