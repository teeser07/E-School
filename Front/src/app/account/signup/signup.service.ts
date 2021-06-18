import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(value) {
    return this.http.disableAuth().disableHeader().disableLoading().post('account/signup', value);
  }
}
