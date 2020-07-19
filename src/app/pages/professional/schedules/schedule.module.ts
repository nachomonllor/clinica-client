import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

import { SharedModule } from '../../../shared/shared.module';

import { PipesModule } from '../../../pipes/pipes.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { CustomFieldComponent } from '../../../components/customfields/custom-field.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    PipesModule,
    SharedModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleDetailComponent,
    ScheduleListComponent,
    CustomFieldComponent
  ],

  providers: [],
  entryComponents: []
})
export class ScheduleModule {}
