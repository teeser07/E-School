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
    path: 'create-timetable/:mapclassroomteacherId',
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
  {
    path: 'teacher-home',
    component: TeacherhomeComponent
  },
  {
    path: 'teacher-room',
    component: TeacherroomComponent
  },
  {
    path: 'homeworks',
    component: HomeworksComponent
  },
  {
    path: 'homework-detail/:ClassRoom/:homeWorkId',
    component: HomeworkDetailComponent
  },
  {
    path: 'homework-list/:empProfileId/:mapClassRoomTeacherId',
    component: HomeworkListComponent
  },
  {
    path: 'homeworkdetail/:homeWorkId',
    component: HomeworkdetailsComponent
  },
  {
    path: 'online-classroom',
    component: OnlineClassComponent
  },
  {
    path: 'online-detail/:mapClassRoomTeacherId',
    component: OnlineDetailComponent
  },
  {
    path: 'documentTeacher',
    component: DocumentsComponent
  },
  {
    path: 'checkhomework',
    component: CheckhomeworkComponent
  },
  {
    path: 'check-detail/:mapClassRoomTeacherId',
    component: CheckDetailComponent
  },
  {
    path: 'check-success/:value/:mapClassRoomTeacherId',
    component: CheckSuccessComponent
  },
  

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
