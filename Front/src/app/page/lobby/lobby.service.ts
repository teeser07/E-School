import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LobbyService {

  constructor(private http: HttpClient) { }

  register(value) {
    return this.http.post('account/register', value);
  }
}
