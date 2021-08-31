import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TimetableService } from '../timetable/timetable.service';
import { TeacherhomeService } from './teacherhome.service';

@Component({
  selector: 'app-teacherhome',
  templateUrl: './teacherhome.component.html',
  styleUrls: ['./teacherhome.component.scss']
})
export class TeacherhomeComponent implements OnInit {

  User : any
  Day :any = []
  Timetable :any = []

  constructor(
    private as : AuthService,
    private TT : TimetableService,
    private TC : TeacherhomeService
   ) { }

  ngOnInit(): void {
    this.as.user 
    this.User = this.as.user 
    // this.TC.getTeacher(this.User.Emp_code).subscribe((res)=>{
    //   this.Day = res
    //   console.log(this.Day)
      
    this.TT.getTimetable(this.Day.map_class_room_teacher_id).subscribe((res)=>{
      this.Timetable = res
      console.log(this.Timetable)
    })
    
  }

}
