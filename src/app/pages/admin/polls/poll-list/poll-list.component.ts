import { environment } from '../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


import Swal from 'sweetalert2';
import { PollDetailComponent } from '../poll-detail/poll-detail.component';
import { Poll } from '../poll.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import { UserService } from '../../users/user.service';
import { NotificationService } from '../../../../services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicFormComponent } from '../../../../components/formbuilder/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../../../components/formbuilder/field.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  url: string;
  dataSource: MatTableDataSource<Poll>;
  displayedColumns: string[] = [
    'id',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      type: 'input',
      label: 'Username',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }
      ]
    },
    {
      type: 'input',
      label: 'Firstname',
      inputType: 'text',
      name: 'firstname',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }
      ]
    },
    {
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email'
        }
      ]
    },
    {
      type: 'input',
      label: 'Password',
      inputType: 'password',
      name: 'password',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Password Required'
        }
      ]
    },
    {
      type: 'radiobutton',
      label: 'Gender',
      name: 'gender',
      options: ['Male', 'Female'],
      value: 'Male'
    },
    {
      type: 'date',
      label: 'DOB',
      name: 'dob',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Date of Birth Required'
        }
      ]
    },
    {
      type: 'select',
      label: 'Country',
      name: 'country',
      value: 'UK',
      options: ['Indias', 'UAE', 'UK', 'US', 'AR', 'PY']
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      value: true
    },
    {
      type: 'button',
      label: 'Save'
    }
  ];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private _httpService: HttpService,
  ) {
    this.url = `${environment.apiUrl}/api/poll`;
  }

  ngOnInit() {
    this._httpService.get(this.url).subscribe(categories => {
      this.dataSource = categories;
    });
  }
  onCreate() {
    const dialogRef = this.dialog.open(
      PollDetailComponent,
      this.dialogConfig(),
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  onEdit(row) {
    const dialogRef = this.dialog.open(
      PollDetailComponent,
      this.dialogConfig(row),
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de eliminar la categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this._httpService.delete<Poll>(`${this.url}/${id}`).subscribe(
          (resp: any) => {
            Swal.fire(
              'Atención',
              'La categoria ha sido Eliminada',
              'success',
            );
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire({
              title: 'Error Validación',
              text: err,
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
              animation: false,
            });
          },
        );
      }
    });
  }
  onSearchClear() {
    if (this.input.nativeElement.value.length > 0) {
      this.input.nativeElement.value = '';
      this.ngOnInit();
    }
  }

  dialogConfig(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = data || null;
    return dialogConfig;
  }
  submit(value: any) {}
}
