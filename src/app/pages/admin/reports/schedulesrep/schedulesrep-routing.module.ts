import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyTokenGuard } from '../../../../services/guards/verify-token.guard';
import { SchedulesRepComponent } from './schedulesrep.component';
import { ScheduleRepListComponent } from './schedulerep-list/schedulerep-list.component';


const routes: Routes = [
  {
    path: '',
    component: SchedulesRepComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Reporte de Turnos' },
    children: [
      {
        path: '',
        component: ScheduleRepListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRepRoutingModule { }
