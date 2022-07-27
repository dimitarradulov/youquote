import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, exhaustMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((userData) => {
          this.handleAuth(userData);
        }),
        exhaustMap((userData) => {
          return this.http.post(
            `${environment.baseUrl}/users/${userData.localId}.json`,
            {
              email: userData.email,
              id: userData.localId,
            }
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((userData) => {
          this.handleAuth(userData);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
  }

  autoLogin() {
    const storedUser = JSON.parse(<string>localStorage.getItem('user'));

    if (!storedUser) return;

    const tokenExpirationDate = new Date(storedUser._tokenExpiration);

    const newUser = new User(
      storedUser.email,
      storedUser.id,
      storedUser._token,
      tokenExpirationDate
    );

    if (!newUser.token) {
      this.logout();
      return;
    }

    this.user.next(newUser);

    this.autoLogout(tokenExpirationDate.getTime() - new Date().getTime());
  }

  autoLogout(tokenExpirationDuration: number) {
    asyncScheduler.schedule(this.logout.bind(this), tokenExpirationDuration);
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured!';

    if (!errResponse.error.error) return throwError(() => new Error(errorMsg));

    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email address is already in use by another account.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMsg =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator.';
        break;
    }

    return throwError(() => new Error(errorMsg));
  }

  private handleAuth(userData: AuthResponseData) {
    const { email, idToken, expiresIn, localId } = userData;

    const tokenExpirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    );

    const newUser = new User(email, localId, idToken, tokenExpirationDate);

    this.user.next(newUser);

    this.saveUser(newUser);

    this.autoLogout(tokenExpirationDate.getTime() - new Date().getTime());
  }

  private saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
