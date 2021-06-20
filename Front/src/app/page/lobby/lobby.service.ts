import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LobbyService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('account/user');
  }
}
