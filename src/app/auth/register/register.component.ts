import { UserService } from '../../pages/admin/users/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivationEnd } from '@angular/router';
import { validRoles } from '../../utils/enums';
import { map, filter, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  role: number;
  imageUpload: File;
  imageTemp: string | ArrayBuffer;
  routeSubs$ = new Subject<void>();
  registerSubs$ = new Subject<void>();
  constructor(
    public _authService: AuthService,
    public _userService: UserService,
    public router: Router
  ) {
    this.getDataRoute()
      .pipe(
        takeUntil(this.routeSubs$)
      )
      .subscribe(data => this.role = data.role);
  }
  ngOnDestroy() {
    this.routeSubs$.unsubscribe();
    this.registerSubs$.unsubscribe();
  }
  comparePasswords(field1: string, field2: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }
  createFormGroup() {
    this.form = new FormGroup(
      {
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required)
      },
      { validators: this.comparePasswords('password', 'confirmPassword') }
    );
  }
  ngOnInit() {
    init_plugins();
    this.createFormGroup();
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    const user = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.role === validRoles.Professional ? validRoles.Professional : validRoles.Patient
    };
    this._userService
      .newUser(user)
      .pipe(
        takeUntil(this.registerSubs$)
      )
      .subscribe((user) => {
        this.changeImage(user.id);
        Swal.fire('Usuario creado', user.email, 'success');
        this.router.navigate(['/login']);
      }, err => {
        Swal.fire('Error :(', err, 'error');
      });
  }
  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imágenes',
        'El archivo seleccionado no es una imagen',
        'error',
      );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    // hace preview de la imagen
    let reader = new FileReader();
    let urlImageTmp = reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }
  changeImage(userId) {
    this._userService
      .changeImage(this.imageUpload, userId)
      .then(() => {
        this.imageUpload = null;
      });
  }
  getDataRoute() {
    return this.router.events
      .pipe(filter(evento => evento instanceof ActivationEnd))
      .pipe(filter((evento: ActivationEnd) => evento.snapshot.firstChild === null))
      .pipe(map((evento: ActivationEnd) => evento.snapshot.data));
  }
}
