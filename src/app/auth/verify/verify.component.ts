import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Subscription, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
declare function init_plugins();

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  verifySubs$ = new Subject<void>();
  constructor(
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    init_plugins();
    this.activatedRoute.params.subscribe(params => {
      const id = +params.id;
      if (id) {
        this.verify(id);
      }
    });
  }

  verify(id) {
    this.authService.verify(id)
      .pipe(takeUntil(this.verifySubs$))
      .subscribe(resp => {
        Swal.fire({
          title: 'Verificación Validada',
          html: 'El usuario ha sido validado, ya puede ingresar a nuestro sistema',
          icon: 'success',
          timer: 3000,
        });
        this.router.navigate(['/login']);
      }, err => {
        Swal.fire({
          title: 'error',
          text: err,
          icon: 'error',
          timer: 3000,
        });
      });
  }
}
