import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { User } from './user.model';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private authObs: Observable<AuthResponseData>;
  isLogin = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onFormSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.error = null;

    if (this.isLogin) {
      this.authObs = this.authService.signIn(email, password);
    } else {
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe({
      next: (userData) => {
        const { email, idToken, expiresIn, localId } = userData;

        const tokenExpirationDate = new Date(new Date().getTime() + +expiresIn);

        const newUser = new User(email, localId, idToken, tokenExpirationDate);

        this.authService.user.next(newUser);

        this.authService.saveUser(newUser);

        this.router.navigate(['/quotes']);
      },
      error: (err) => {
        console.error(err);
        this.error = err.message;
      },
    });
  }
}
