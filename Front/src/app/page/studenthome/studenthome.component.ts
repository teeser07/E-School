import { Component, OnInit } from '@angular/core';
import { StudenthomeService } from './studenthome.service';
import { HeaderSidebarLargeService } from 'src/app/shared/theme/components/layouts/admin-layout-sidebar-large/header-sidebar-large/header-sidebar-large.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.scss']
})
export class StudenthomeComponent implements OnInit {
  User : any
  Profile :any = []
  Room :any =[]
  
  constructor(
   private HS : HeaderSidebarLargeService,
   private as : AuthService,
   private SS : StudenthomeService

  ) { }

  ngOnInit(): void {
    this.as.user 
    this.User = this.as.user 
    console.log(this.User)

    this.SS.getStudent(this.User.studentCode).subscribe((res)=>{
      this.Profile = res
      console.log(this.Profile)

    this.SS.getRoom(this.Profile.map_class_room_teacher_id).subscribe((res)=>{
      this.Room = res
      console.log(this.Room)
    })
    })

  }

  

  
 
}
