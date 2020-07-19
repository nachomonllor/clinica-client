import { environment } from './../../../../../environments/environment';
import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';
import { Schedule } from '../schedule.model';
import { User } from '../../../admin/users/user.model';
import { Category } from '../../../admin/categories/category.model';
import { NgxCalendarComponent } from 'ss-ngx-calendar';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpService } from '../../../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendar: NgxCalendarComponent;
  timeTable: string[];
  category: Category;
  schedule: Schedule;
  scheduleSubscription: Subscription = new Subscription();
  scheduleTime: Date;
  url: string;
  form: FormGroup;
  formHeader: FormGroup;
  constructor(
    private _notificationService: NotificationService,
    private router: Router,
    public _httpService: HttpService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.formHeader = fb.group({
      patient: new FormControl(null),
      category: new FormControl(null, Validators.required),
    });


    this.url = `${environment.apiUrl}/api/schedule`;
    this.createFormGroup();
    activatedRoute.params.subscribe(params => {
      const id = +params.id;
      this.populateForm( +params.id);
    })
//    this.populateForm(data);
  }
  ngOnDestroy() {
    this.scheduleSubscription.unsubscribe();
  }
  createFormGroup() {
    this.form = this.fb.group({
      id: new FormControl(null),
      appointmentDate: new FormControl(null, Validators.required),
      appointmentTime: new FormControl(null, Validators.required),
      reviewProfessional: new FormControl(null),
      customfields: new FormArray([
        new FormGroup({
          field: new FormControl(null),
          value: new FormControl(null),
        })
      ]),
      status: new FormControl('1', Validators.required),
    });
  }
  get customfields(): FormArray {
    return this.form.get('customfields') as FormArray;
  }
  addCustomField(){
    const controls = this.form.controls['customfields'] as FormArray;
    if (controls.length > 2) {
      Swal.fire({
        title: 'Atención',
        text: 'Puedes agregar solo 3 campos customfields',
        icon: 'info',
        showConfirmButton: true,
        timer: 2000,
        animation: true,
      });
      return;
    }
    this.customfields.push(new FormGroup({
      field: new FormControl(null),
      value: new FormControl(null)
    }));
  }
  removeCustomField() {
    if (this.customfields.length > 1) {
      this.customfields.removeAt(this.customfields.length - 1);
    }
  }
  ngOnInit() { }
  onClear() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }
  onClose() {
    this.router.navigate(['/schedules']);
  }
  onSubmit() {
    if (this.form.valid) {
      Swal.fire({
        title: '¿Deseas Actualizar el los datos del turno?',
        html: `
            Estás a punto de actualizar un turno del paciente<br>¿Deseas Continuar?
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Actualizar!',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          const url = `${this.url}/${this.form.get('id').value}`;
          this._httpService.put(url, this.prepareData(this.form.value)).subscribe(
            (resp: any) => {
              Swal.fire({
                title: 'Atención',
                text: 'El turno ha sido actualizado',
                icon: 'success',
                timer: 2000,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
              });
              this.onClose();
            },
            (err) => {
              Swal.fire(
                'Error',
                `:: ${err}`,
                'error'
              );
            },
          );
        }
      });
    }
  }
  private prepareData(value) {
    const time = value.appointmentTime.split(':');
    const date = moment(value.appointmentDate);
    const appointmentDate = new Date(
      date.year(),
      date.month(),
      date.date(),
      time[0],
      time[1]
    );
    return {
      appointmentDate,
      reviewProfessional: value.reviewProfessional,
      status: value.status,
      customfields: value.customfields
    };
  }
  populateForm(id) {
    const url = `${this.url}/${id}`;
    this.scheduleSubscription = this._httpService.getSingle<Schedule>(url)
      .subscribe((res: any) => {
        const schedule = res.payload;
        this.formHeader.get('patient').setValue(schedule.Patient.User.firstname + ' ' + schedule.Patient.User.lastname);
        this.formHeader.get('category').setValue(schedule.Category.name);
        this.form.get('id').setValue(schedule.id);
        this.form.get('appointmentDate').setValue(schedule.appointmentDate);
        this.form.get('status').setValue(schedule.status.toString());
        this.form.get('appointmentTime').setValue(
          moment(schedule.appointmentDate).format('HH:mm').toString()
        );
        schedule.customFields = JSON.parse(schedule.customFields);
        schedule.customFields.map((value, key) => {
          if ( key > 0 ) {
           this.customfields.push(
            new FormGroup({
              field: new FormControl(null),
              value: new FormControl(null)
            })
           );
          }
          this.form.get('customfields').get(key.toString()).get('field').setValue(value.field.toString());
          this.form.get('customfields').get(key.toString()).get('value').setValue(value.value.toString());
      });
        this.form.get('reviewProfessional').setValue(schedule.reviewProfessional);
      }, err => this._notificationService.error(`:: ${err}`));
  }
}
