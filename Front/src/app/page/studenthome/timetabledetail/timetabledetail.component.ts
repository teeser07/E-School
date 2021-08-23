import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HeaderSidebarLargeService } from 'src/app/shared/theme/components/layouts/admin-layout-sidebar-large/header-sidebar-large/header-sidebar-large.service';
import { TimetableService } from '../../timetable/timetable.service';
import { StudenthomeService } from '../studenthome.service';

@Component({
  selector: 'app-timetabledetail',
  templateUrl: './timetabledetail.component.html',
  styleUrls: ['./timetabledetail.component.scss']
})
export class TimetabledetailComponent implements OnInit {
  User : any
  Profile :any = []
  Timetable :any = []
  constructor(
    private HS : HeaderSidebarLargeService,
    private as : AuthService,
    private SS : StudenthomeService,
    private TT : TimetableService
  ) { }

  ngOnInit(): void {
    this.as.user 
    this.User = this.as.user 

    this.SS.getStudent(this.User.studentCode).subscribe((res)=>{
      this.Profile = res
      
    this.TT.getTimetable(this.Profile.map_class_room_teacher_id).subscribe((res)=>{
      this.Timetable = res
      console.log(this.Timetable)
    })
  })
  }

}
