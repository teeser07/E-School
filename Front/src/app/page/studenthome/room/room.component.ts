import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StudenthomeService } from '../studenthome.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  User : any
  Profile :any = []
  Room :any =[]
  row : any[]
  constructor(
    private as : AuthService,
    private SS : StudenthomeService
  ) { }

  ngOnInit(): void {
   this.getRoomProfile()
   this.getLink()
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

  getLink(){
    this.as.user 
    this.User = this.as.user 

    this.SS.getStudent(this.User.studentCode).subscribe((res)=>{
      this.Profile = res

    this.SS.getStudentLink(this.Profile.map_class_room_teacher_id).subscribe((res:any)=>{
      this.row = res.onlineLinkList
      console.log(this.row)
      
    })
    })
  }
}
