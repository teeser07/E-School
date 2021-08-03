import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  getPeriod(keyword){
    return this.http.get('Period/get-period',{ params: { keyword: keyword } });
  }

  deletePeriod(periodId){
    return this.http.delete('Period/delete-period',{ params: { periodId: periodId } });
  }

  save(value) {
    if (value.periodId)
      return this.http.put('Period/update-period', value);
    else
      return this.http.post('Period/save-period', value);
  }
}
