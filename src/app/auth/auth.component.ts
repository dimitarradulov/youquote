import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoadingService } from '../shared/loading-spinner/loading.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onFormSubmit(form: NgForm) {
    const { email, password } = form.value;

    let authObs: Observable<any>;

    this.error = null;

    if (this.isLogin) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (err) => {
        console.error(err);
        this.error = err.message;
      },
    });
  }
}
