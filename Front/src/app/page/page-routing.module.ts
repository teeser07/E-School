import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { StdComponent } from './std/std.component';
import { EmpComponent } from './emp/emp.component';
import { AddClassComponent } from './classroom/add-class/add-class.component';
import { EmpInfoComponent } from './emp/emp-info/emp-info.component';
import { EmpInfoEditComponent } from './emp/emp-info-edit/emp-info-edit.component';
import { EmpLeaveComponent } from './emp/emp-leave/emp-leave.component';
import { StdInfoComponent } from './std/std-info/std-info.component';
import { StdInfoEditComponent } from './std/std-info-edit/std-info-edit.component';
import { SubjectComponent } from './subject/subject.component';
import { PeriodComponent } from './period/period.component';
import { HolidayComponent } from './holiday/holiday.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { TimetableComponent } from './timetable/timetable.component';
import { RoomComponent } from './studenthome/room/room.component';
import { AddStudentComponent } from './classroom/add-student/add-student.component';
import { CreatetimetableComponent } from './timetable/createtimetable/createtimetable.component';
import { TimetabledetailComponent } from './studenthome/timetabledetail/timetabledetail.component';
import { DocumentComponent } from './studenthome/document/document.component';
import { HomeworkComponent } from './studenthome/homework/homework.component';
import { TeacherhomeComponent } from './teacherhome/teacherhome.component';
import { TeacherroomComponent } from './teacherhome/teacherroom/teacherroom.component';
import { HomeworksComponent } from './teacherhome/homeworks/homeworks.component';
import { HomeworkDetailComponent } from './teacherhome/homeworks/homework-detail/homework-detail.component';
import { HomeworkListComponent } from './studenthome/homework/homework-list/homework-list.component';
import { HomeworkdetailsComponent } from './studenthome/homework/homeworkdetails/homeworkdetails.component';
import { OnlineClassComponent } from './online-class/online-class.component';
import { OnlineDetailComponent } from './online-class/online-detail/online-detail.component';
import { DocumentsComponent } from './teacherhome/documents/documents.component';
import { CheckhomeworkComponent } from './teacherhome/checkhomework/checkhomework.component';
import { CheckDetailComponent } from './teacherhome/checkhomework/check-detail/check-detail.component';
import { CheckSuccessComponent } from './teacherhome/checkhomework/check-success/check-success.component';
import { HasRoleGuard } from '../core/role/has-role.guard';

const routes: Routes = [
  {
    path: 'custom-demo',
    loadChildren: () => import('./custom-demo/custom-demo.module').then(m => m.CustomDemoModule)
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'classroom',
    component: ClassroomComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'std',
    component: StdComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'emp',
    component: EmpComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  
  {
    path: 'emp-info',
    component: EmpInfoComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'emp-info-edit',
    component: EmpInfoEditComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'std-info',
    component: StdInfoComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'std-info-edit',
    component: StdInfoEditComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'emp-leave',
    component: EmpLeaveComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'subject',
    component: SubjectComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'period',
    component: PeriodComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'holiday',
    component: HolidayComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'add-room',
    component: AddClassComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {

    path: 'timetable',
    component: TimetableComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'create-timetable/:mapclassroomteacherId',
    component: CreatetimetableComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'student-home',
    component: StudenthomeComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'room',
    component: RoomComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'tt-detail',
    component: TimetabledetailComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'document',
    component: DocumentComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'homework',
    component: HomeworkComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'teacher-home',
    component: TeacherhomeComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'teacher-room',
    component: TeacherroomComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'homeworks',
    component: HomeworksComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'homework-detail/:ClassRoom/:homeWorkId',
    component: HomeworkDetailComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'homework-list/:empProfileId/:mapClassRoomTeacherId',
    component: HomeworkListComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'homeworkdetail/:homeWorkId/:mapClassRoomTeacherId',
    component: HomeworkdetailsComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'S',
    }
  },
  {
    path: 'online-classroom',
    component: OnlineClassComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'online-detail/:mapClassRoomTeacherId',
    component: OnlineDetailComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'A',
    }
  },
  {
    path: 'documentTeacher',
    component: DocumentsComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'checkhomework',
    component: CheckhomeworkComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'check-detail/:mapClassRoomTeacherId',
    component: CheckDetailComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  {
    path: 'check-success/:value/:studentId',
    component: CheckSuccessComponent,
    canActivate: [HasRoleGuard],
    data:{
      role: 'T',
    }
  },
  

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
