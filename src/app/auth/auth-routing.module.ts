import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { validRoles } from '../utils/enums';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'verify/:id', component: VerifyComponent },
  {
    path: 'register-professional',
    component: RegisterComponent,
    data: { role: validRoles.Professional }
  },
  {
    path: 'register-patient',
    component: RegisterComponent,
    data: { role: validRoles.Patient }
  },
  { path: 'register', component: RegisterComponent, data: { role: validRoles.Patient } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
