import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { StdComponent } from './std/std.component';
import { EmpComponent } from './emp/emp.component';
import { ClassroomInfoComponent } from './classroom/classroom-info/classroom-info.component';
import { ClassroomScoreComponent } from './classroom/classroom-score/classroom-score.component';
import { EmpInfoComponent } from './emp/emp-info/emp-info.component';
import { EmpInfoEditComponent } from './emp/emp-info-edit/emp-info-edit.component';
import { EmpLeaveComponent } from './emp/emp-leave/emp-leave.component';
import { StdInfoComponent } from './std/std-info/std-info.component';
import { StdInfoEditComponent } from './std/std-info-edit/std-info-edit.component';
import { SubjectComponent } from './subject/subject.component';
import { TimeComponent } from './time/time.component';

const routes: Routes = [
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
    path: 'classroom-info',
    component: ClassroomInfoComponent
  },
  {
    path: 'classroom-score',
    component: ClassroomScoreComponent
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
    path: 'time',
      component: TimeComponent
    },
 

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
