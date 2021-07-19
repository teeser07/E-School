import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from './theme/components/search/search.module';
import { SharedComponentsModule } from './theme/components/shared-components.module';
import { SharedDirectivesModule } from './theme/directives/shared-directives.module';
import { SharedPipesModule } from './theme/pipes/shared-pipes.module';
import { FormUtilService } from './services/form-util.service';
import { ToolbarComponent } from './conponents/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SearchModule,
    ToastrModule.forRoot(),
    NgbModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [
    FormUtilService
  ]
})
export class SharedModule { }
