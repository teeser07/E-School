import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StudenthomeService } from '../studenthome.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  User : any
  Profile :any = []
  Room :any =[]
  constructor(
    private as : AuthService,
    private SS : StudenthomeService
  ) { }

  ngOnInit(): void {
    this.getRoomProfile()
  }

  getRoomProfile(){
    this.as.user 
    this.User = this.as.user 

    this.SS.getStudent(this.User.studentCode).subscribe((res)=>{
      this.Profile = res
      
    this.SS.getRoom(this.Profile.map_class_room_teacher_id).subscribe((res)=>{
      this.Room = res
    })
    })
  }
}
