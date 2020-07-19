import { environment } from './../../../environments/environment';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';
import * as Survey from 'survey-angular';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../auth/auth.service';
import { validRoles } from '../../utils/enums';
import { PatientSurveyService } from '../survey/survey-patient';
import { ProfessionalSurveyService } from '../survey/survey-professional';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../appointments/appointment.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'surveyjs-component',
  template: `<div id="surveyContainer"></div>`
})
export class SurveyjsComponent implements OnInit {
  editor: SurveyEditor.SurveyEditor;
  survey: any;
  url: string;
  appointmentId: number;
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    if (authService.user.role === validRoles.Patient) {
      this.survey = new PatientSurveyService();
    }
    if (authService.user.role === validRoles.Professional) {
      this.survey = new ProfessionalSurveyService();
    }
    this.activateRoute.params.subscribe(params => {
      this.appointmentId = +params.id;
    });
    this.url = `${environment.apiUrl}/api/survey`;
  }
  ngOnInit() {
    Survey
      .StylesManager
      .applyTheme('modern');
    this.createSurvey();
  }
  createSurvey() {
    this.survey.getSurvey().then(data => {
      const survey = new Survey.Model(data);
      survey.onComplete.add((survey) => {
        let elements = data.pages[0].elements;
        for (let i = 0; i < elements.length; i++) {
          elements[i].result = Object.values(survey.data)[i];
        }
        this.httpService.put(`${this.url}/${this.appointmentId}`, elements).subscribe(resp => {
          Swal.fire({
            title: 'Gracias :)',
            html: 'La encuesta ha sido guardada satisfactoriamente',
            icon: 'success'
          });
          const role = this.authService.user.role;
          if (validRoles.Professional) {
            this.router.navigate(['/schedules']);
          } else {
            this.router.navigate(['/appointments']);
          }
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
            animation: false,
          });
        });

      });
      Survey.SurveyNG.render('surveyContainer', { model: survey });
    });
  }
}

