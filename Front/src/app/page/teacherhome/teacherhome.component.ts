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
  Week : any = [{value:"Mo",Name:"จันทร์"},
                {value:"Tu",Name:"อังคาร"},
                {value:"We",Name:"พุธ"},
                {value:"Th",Name:"พฤหัสบดี"},
                {value:"Fr",Name:"ศุกร์"},
                {value:"Sa",Name:"เสาร์"},
                {value:"Su",Name:"อาทิตย์"}]
  Subject : any =[]
  User : any
  Day :any = 0
  timetableList: any[] = [] ;

  constructor(
    private as : AuthService,
    private TT : TimetableService,
    private TC : TeacherhomeService
   ) { }

  ngOnInit(): void {
    
    // this.TC.getTeacher(this.User.Emp_code).subscribe((res)=>{
    //   this.Day = res
    //   console.log(this.Day)
      
    // this.TT.getTimetable(this.Day.map_class_room_teacher_id).subscribe((res)=>{
    //   this.Timetable = res
    //   console.log(this.Timetable)
    // })
    this.getUser()
    this.getTimetable()
  }

  getUser(){
    this.as.user
    this.User = this.as.user.empProfileId
  }
  

  getTimetable(){
    this.TC.getSubjects(this.User).subscribe((res)=>{
      this.Subject = res

    this.TC.getTimetable(this.Day,this.Subject.subjectId).subscribe((res:any)=>{
      this.timetableList = res.timetableList
    console.log(this.timetableList)
    })
  })
  }
  

}
