import { environment } from '../../../../../environments/environment';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import urlJoin from 'url-join';
import { Subscription } from 'rxjs';
import { Poll } from '../poll.model';
import { NotificationService } from '../../../../services/notification.service';
import { HttpService } from '../../../../services/http.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit, OnDestroy {
  Poll: Poll;
  PollSubscription: Subscription = new Subscription();
  url: string;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<PollDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _httpService: HttpService,
  ) {
    this.url = `${environment.apiUrl}/api/poll`;
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.PollSubscription.unsubscribe();
  }
  ngOnInit() {}
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        this._httpService.post(this.url, this.form.value).subscribe(
          (resp: any) => {
            this.onClose(true);
            Swal.fire(
              'Atención :)',
              'La encuesta ha sido creada',
              'success',
            );
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      } else {
        this._httpService.put<Poll>(`${this.url}/${this.form.get('id').value}`, this.form.value).subscribe(
          (poll) => {
            this.onClose(true);
            Swal.fire(
              'Atención :)',
              'La encuesta ha sido actualizada',
              'success',
            );
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      }
    }
  }
  populateForm(data) {
    // this.PollSubscription = this._httpService
    //   .getSingle<Poll>(data.id)
    //   .subscribe((res: any) => {
    //     this.Poll = res.payload;
    //     this.form.get('id').setValue(this.Poll.id);
    //     this.form.get('name').setValue(this.Poll.name);
    //     this.form.get('active').setValue(this.Poll.active);
    //   }, err => this.notificationService.error(`:: ${err}`));
  }
}
