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
    component: ClassroomComponent
  },
  {
    path: 'std',
    component: StdComponent
  },
  {
    path: 'emp',
    component: EmpComponent
  },
  {
    path: 'emp-info',
    component: EmpInfoComponent
  },
  {
    path: 'emp-info-edit',
    component: EmpInfoEditComponent
  },
  {
    path: 'std-info',
    component: StdInfoComponent
  },
  {
    path: 'std-info-edit',
    component: StdInfoEditComponent
  },
  {
    path: 'emp-leave',
    component: EmpLeaveComponent
  },
  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    path: 'period',
    component: PeriodComponent
  },
  {
    path: 'holiday',
    component: HolidayComponent
  },
  {
    path: 'add-room',
    component: AddClassComponent
  },
  {

    path: 'timetable',
    component: TimetableComponent
  },
  {
    path: 'add-student',
    component: AddStudentComponent
  },
  {
    path: 'create-timetable',
    component: CreatetimetableComponent
  },
  {
    path: 'student-home',
    component: StudenthomeComponent
  },
  {
    path: 'room',
    component: RoomComponent
  },
  {
    path: 'tt-detail',
    component: TimetabledetailComponent
  },
  {
    path: 'document',
    component: DocumentComponent
  },
  {
    path: 'homework',
    component: HomeworkComponent
  },
 

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
