import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ScheduleModule } from '../../../professional/schedules/schedule.module';
import { SchedulesRepComponent } from './schedulesrep.component';
import { RouterModule } from '@angular/router';
import { ScheduleRepListComponent } from './schedulerep-list/schedulerep-list.component';
import { SchedulesRepRoutingModule } from './schedulesrep-routing.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SchedulesRepRoutingModule,
    ScheduleModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    SchedulesRepComponent,
    ScheduleRepListComponent,
  ],
  exports: [
  ],
  providers: [],
  entryComponents: []
})
export class SchedulesRepModule {}
