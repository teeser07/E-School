import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { EschoolRoutingModule } from './eschool-routing.module';
import { LobbyService } from './lobby/lobby.service';

@NgModule({
  declarations: [
    LobbyComponent
  ],
  imports: [
    CommonModule,
    EschoolRoutingModule
  ],
  providers: [
    LobbyService
  ]
})
export class EschoolModule { }
