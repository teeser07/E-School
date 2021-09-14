import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { PageRoutingModule } from './page-routing.module';
import { LobbyService } from './lobby/lobby.service';
import { ClassroomComponent } from './classroom/classroom.component';
import { StdComponent } from './std/std.component';
import { EmpComponent } from './emp/emp.component';
import { ClassroomService } from './classroom/classroom.service';
import { EmpService } from './emp/emp.service';
import { StdService } from './std/std.service';
import { SharedComponentsModule } from '../shared/theme/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { EmpInfoComponent } from './emp/emp-info/emp-info.component';
import { EmpLeaveComponent } from './emp/emp-leave/emp-leave.component';
import { EmpInfoEditComponent } from './emp/emp-info-edit/emp-info-edit.component';
import { StdInfoEditComponent } from './std/std-info-edit/std-info-edit.component';
import { StdInfoComponent } from './std/std-info/std-info.component';
import { SubjectComponent } from './subject/subject.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PeriodComponent } from './period/period.component';
import { HolidayComponent } from './holiday/holiday.component';
import { AddClassComponent } from './classroom/add-class/add-class.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AddStudentComponent } from './classroom/add-student/add-student.component';
import { CreatetimetableComponent } from './timetable/createtimetable/createtimetable.component';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { RoomComponent } from './studenthome/room/room.component';
import { TimetabledetailComponent } from './studenthome/timetabledetail/timetabledetail.component';
import { DocumentComponent } from './studenthome/document/document.component';
import { HomeworkComponent } from './studenthome/homework/homework.component';
import { TeacherhomeComponent } from './teacherhome/teacherhome.component';
import { TeacherroomComponent } from './teacherhome/teacherroom/teacherroom.component';
import { StudentListComponent } from './teacherhome/student-list/student-list.component';
import { DocumentsComponent } from './teacherhome/documents/documents.component';
import { HomeworksComponent } from './teacherhome/homeworks/homeworks.component';
import { HomeworkDetailComponent } from './teacherhome/homeworks/homework-detail/homework-detail.component';
import { HomeworkListComponent } from './studenthome/homework/homework-list/homework-list.component';
import { HomeworkdetailsComponent } from './studenthome/homework/homeworkdetails/homeworkdetails.component';
import { OnlineClassComponent } from './online-class/online-class.component';
import { OnlineDetailComponent } from './online-class/online-detail/online-detail.component';




@NgModule({
  declarations: [
    LobbyComponent,
    ClassroomComponent,
    StdComponent,
    EmpComponent,
    EmpInfoComponent,
    EmpLeaveComponent,
    EmpInfoEditComponent,
    StdInfoEditComponent,
    StdInfoComponent,
    SubjectComponent,
    PeriodComponent,
    HolidayComponent,
    AddClassComponent,
    TimetableComponent,
    AddStudentComponent,
    CreatetimetableComponent,
    StudenthomeComponent,
    RoomComponent,
    TimetabledetailComponent,
    DocumentComponent,
    HomeworkComponent,
    TeacherhomeComponent,
    TeacherroomComponent,
    StudentListComponent,
    DocumentsComponent,
    HomeworksComponent,
    HomeworkDetailComponent,
    HomeworkListComponent,
    HomeworkdetailsComponent,
    OnlineClassComponent,
    OnlineDetailComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule,
    SharedModule
  ],
  providers: [
    LobbyService,
    ClassroomService,
    EmpService,
    StdService
  ]
})
export class PageModule { }
