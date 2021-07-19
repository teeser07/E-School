import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CustomDemoRoutingModule } from './custom-demo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    CustomDemoRoutingModule,
    SharedModule
  ]
})
export class CustomDemoModule { }
