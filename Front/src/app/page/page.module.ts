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
