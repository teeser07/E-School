import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { PageRoutingModule } from './page-routing.module';
import { LobbyService } from './lobby/lobby.service';
import { ListStdComponent } from './lobby/list-std/list-std.component';
import { ListEmpComponent } from './lobby/list-emp/list-emp.component';
import { ClassroomsComponent } from './lobby/classrooms/classrooms.component';
import { InfoComponent } from './lobby/classrooms/info/info.component';
import { ScoreComponent } from './lobby/classrooms/info/score/score.component';
import { InfoEmpComponent } from './lobby/list-emp/info-emp/info-emp.component';
import { LeaveWorkComponent } from './lobby/list-emp/leave-work/leave-work.component';
import { InfoStdComponent } from './lobby/list-std/info-std/info-std.component';
import { StdRegisterComponent } from './lobby/list-std/std-register/std-register.component';
import { EmpRegisterComponent } from './lobby/list-emp/emp-register/emp-register.component';
import { InfoStdEditComponent } from './lobby/list-std/info-std/info-std-edit/info-std-edit.component';
import { InfoEmpEditComponent } from './lobby/list-emp/info-emp/info-emp-edit/info-emp-edit.component';
import { AddRoomComponent } from './lobby/classrooms/add-room/add-room.component';

@NgModule({
  declarations: [
    LobbyComponent,
    ListStdComponent,
    ListEmpComponent,
    ClassroomsComponent,
    InfoComponent,
    ScoreComponent,
    InfoEmpComponent,
    LeaveWorkComponent,
    InfoStdComponent,
    StdRegisterComponent,
    EmpRegisterComponent,
    InfoStdEditComponent,
    InfoEmpEditComponent,
    AddRoomComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ],
  providers: [
    LobbyService
  ]
})
export class PageModule { }
