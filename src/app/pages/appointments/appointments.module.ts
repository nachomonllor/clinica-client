import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TurnsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AppointmentService } from './appointment.service';
import { MaterialModule } from '../../shared/material.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { NotificationService } from '../../services/notification.service';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentListResolverGuard } from './appointment-list/appointment-list-resolver.guard';
import { PipesModule } from '../../pipes/pipes.module';
import { CategoriesModule } from '../admin/categories/categories.module';
import { UsersModule } from '../admin/users/users.module';

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentListComponent,
    AppointmentDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TurnsRoutingModule,
    PipesModule,
    RouterModule,
    CategoriesModule,
    UsersModule
  ],
  providers: [AppointmentService, AppointmentListResolverGuard]
})
export class AppointmentsModule {}