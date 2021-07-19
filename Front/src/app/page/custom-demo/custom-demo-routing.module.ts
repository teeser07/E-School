import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  {
    path: 'toolbar',
    component: ToolbarComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomDemoRoutingModule { }
