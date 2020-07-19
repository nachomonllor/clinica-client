import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PollsRoutingModule } from './polls-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../shared/material.module';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { PollsComponent } from './polls.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { FormBuilderModule } from '../../../components/formbuilder/form-builder.module';
@NgModule({
  declarations: [
    PollsComponent,
    PollListComponent,
    PollDetailComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    PollsRoutingModule,
    PipesModule,
    RouterModule,
    FormBuilderModule
  ],
  providers: []
})
export class PollsModule { }
