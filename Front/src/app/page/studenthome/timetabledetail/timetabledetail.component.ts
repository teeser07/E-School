import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HeaderSidebarLargeService } from 'src/app/shared/theme/components/layouts/admin-layout-sidebar-large/header-sidebar-large/header-sidebar-large.service';
import { TimetableService } from '../../timetable/timetable.service';
import { StudenthomeService } from '../studenthome.service';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-timetabledetail',
  templateUrl: './timetabledetail.component.html',
  styleUrls: ['./timetabledetail.component.scss']
})
export class TimetabledetailComponent implements OnInit {
  Week : any = [{value:"Mo",Name:"จันทร์"},
                {value:"Tu",Name:"อังคาร"},
                {value:"We",Name:"พุธ"},
                {value:"Th",Name:"พฤหัสบดี"},
                {value:"Fr",Name:"ศุกร์"},
                {value:"Sa",Name:"เสาร์"},
                {value:"Su",Name:"อาทิตย์"}]
  User : any;
  Day : any = 0;
  Profile :any = []
  timetable: any = [] ;
  timetableList: any[] = [] ;
  Room : any = [];
  row: any[];
  fileToUpload: File | null = null;
  constructor(
    private HS : HeaderSidebarLargeService,
    private as : AuthService,
    private SS : StudenthomeService,
    private TT : TimetableService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getRoom()
    
  }

  getTimetable(){
    this.SS.getTimeTableInClass(this.Day,this.Profile.map_class_room_teacher_id).subscribe((res:any)=>{
      this.timetableList = res.timetableList
    })
  }
  getRoom(){
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
