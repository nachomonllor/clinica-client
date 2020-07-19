import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule.component';

import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { SurveyjsComponent } from '../../survey/surveyjs.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Agenda Médica' },
    children: [
      {
        path: '',
        component: ScheduleListComponent
      },
      {
        path: 'polls/:id',
        component: SurveyjsComponent,
        data: { titulo: 'Encuesta'}
      },
      {
        path: ':id',
        component: ScheduleDetailComponent,
        data: { titulo: 'Turno'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
