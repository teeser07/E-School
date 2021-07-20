import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  getPeriod(){
    return this.http.get('Period/get-period');
  }

  deletePeriod(id:any){
    return this.http.delete(`Period/delete-period?period_id=${id}`);
  }

  savePeriod(data:any){
    return this.http.post('Period/save-period',data)
  }

  getPeriodDetail(id:any){
    return this.http.get(`Period/get-period-detail?period_id=${id}`)
  }

  updatePeriod(id:any,data:any){
    return this.http.put(`Period/update-period?period_id=${id}`,data)
  }
}
