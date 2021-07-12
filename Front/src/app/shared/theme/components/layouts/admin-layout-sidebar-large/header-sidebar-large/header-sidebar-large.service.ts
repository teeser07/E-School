import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderSidebarLargeService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('account/user');
  }
}
