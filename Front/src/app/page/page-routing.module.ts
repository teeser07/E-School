import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
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

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'room',
    component: ClassroomsComponent
  },
  {
    path: 'list-std',
    component: ListStdComponent
  },
  {
    path: 'list-emp',
    component: ListEmpComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'score',
    component: ScoreComponent
  },
  {
    path: 'info-emp',
    component: InfoEmpComponent
  },
  {
    path: 'info-emp-edit',
    component: InfoEmpEditComponent
  },
  {
    path: 'info-std',
    component: InfoStdComponent
  },
  {
    path: 'info-std-edit',
    component: InfoStdEditComponent
  },
  {
    path: 'leave-work',
    component: LeaveWorkComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
