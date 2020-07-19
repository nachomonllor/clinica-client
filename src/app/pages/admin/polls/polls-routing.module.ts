import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollsComponent } from './polls.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: PollsComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Encuestas' },
    children: [
      {
        path: '',
        component: PollListComponent
      },
      { path: 'new', component: PollDetailComponent },
      { path: ':id', component: PollDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollsRoutingModule { }
