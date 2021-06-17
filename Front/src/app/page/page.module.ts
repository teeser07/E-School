import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { PageRoutingModule } from './page-routing.module';
import { LobbyService } from './lobby/lobby.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LobbyComponent
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
