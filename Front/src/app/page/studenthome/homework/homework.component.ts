import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StudenthomeService } from '../studenthome.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {
  User : any
  Profile :any = []
  Room :any =[]
  subjectList : any[] =[]
  constructor(
    private as : AuthService,
    private SS : StudenthomeService,
  ) { 
    
  }

  ngOnInit(): void {
    this.getRoomProfile()
    this.getSubject()
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

  getSubject(){
    this.SS.getStudent(this.User.studentCode).subscribe((res)=>{
      this.Profile = res
    this.SS.getSubjectList(this.Profile.map_class_room_teacher_id).subscribe((res:any)=>{
      this.subjectList = res.subjectList
      console.log(this.subjectList)
    })
    })
  }
}
