import { environment } from './../../../../environments/environment';
import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { User } from '../../admin/users/user.model';
import { Category } from '../../admin/categories/category.model';
import { NgxCalendarComponent } from 'ss-ngx-calendar';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit, OnDestroy {
  formProfessional: FormGroup;
  formPatient: FormGroup;
  url: string;
  constructor(
    private _notificationService: NotificationService,
    private router: Router,
    public _httpService: HttpService,
    private dialogRef: MatDialogRef<ReviewDetailComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.url = `${environment.apiUrl}/api/review`;
    this.createFormGroup();
    this.populateForm(data);
  }
  ngOnDestroy() {

  }
  ngOnInit() {

  }
  onClear() {
    this.dialogRef.close();
  }
  private createFormGroup() {
    this.formProfessional = new FormGroup({
      reviewProfessional: new FormControl(null)
    });
    this.formPatient = new FormGroup({
      id: new FormControl(null, Validators.required),
      reviewPatient: new FormControl(null, Validators.required)
    });
  }

  onFeedback(id) {
    if (this.formPatient.valid) {
      Swal.fire({
        title: '¿Deseas Confirmar la reseña?',
        html: `
            La reseña podrá ser vista por el profesional que te atendió. Esto nos sirve para evaluar a nuestros profesionales y poder mejorar los servicios.
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí!',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this._httpService.put(`${this.url}/${id}`, this.formPatient.value).subscribe(
            (resp: any) => {
              Swal.fire(
                'Atención',
                'La reseña ha sido ingresada',
                'success'
              );
              this.router.navigate(['/appointments']);
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
  populateForm(id) {
    // this.reviewSubscription = this._httpService
    this._httpService.getSingle(`${this.url}/${id}`)
      .subscribe((res: any) => {
        const review = res.payload;
        this.formProfessional.get('reviewProfessional').setValue(review.reviewProfessional);
        this.formPatient.get('id').setValue(review.id);
        this.formPatient.get('reviewPatient').setValue(review.reviewPatient);
      }, err => this._notificationService.error(`:: ${err}`));
  }

}
