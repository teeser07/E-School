import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { EschoolRoutingModule } from './eschool-routing.module';

@NgModule({
  declarations: [
    LobbyComponent
  ],
  imports: [
    CommonModule,
    EschoolRoutingModule
  ]
})
export class EschoolModule { }
