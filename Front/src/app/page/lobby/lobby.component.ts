import { Component, OnInit } from '@angular/core';
import { LobbyService } from './lobby.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private http: LobbyService) { }

  ngOnInit(): void {

  }

  click() {
    this.http.register({
      email: 'email',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      userName: 'userName'
    }).subscribe(res => {
      console.log(res)
    })
  }

}
