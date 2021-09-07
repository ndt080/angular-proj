import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {User} from "../../core/models/user";
import {Tokens} from "../../core/models/tokens";
import {NotificationService} from "../../core/services/notification.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string = '';

  constructor(private http: HttpClient, private notify: NotificationService, private router: Router) {
  }

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
      .pipe(
        tap(resp => {
            const {tokens, username}: any = resp;
            this.loggedUser = username;
            this.storeTokens(tokens);
            this.router.navigate(['/']);
          },
          err => {
            console.log(err.error)
            this.notify.showError(err.error.message, 'Error: Sign in')
          },
          () => this.notify.showSuccess('Sign in complete!', 'Sign in')
        )
      )
  }

  register(user: User): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/register`, user)
      .pipe(
        tap(resp => {
            const {tokens, username}: any = resp;
            this.loggedUser = username;
            this.storeTokens(tokens);
            this.router.navigate(['/']);
          },
          err => {
            console.log(err.error)
            this.notify.showError(err.error.message, 'Error: Sign up')
          },
          () => this.notify.showSuccess('Sign up complete!', 'Sign up')
        )
      )
  }

  logout(): boolean {
    try {
      this.loggedUser = '';
      this.removeTokens();
      this.router.navigate(['/login']);
      this.notify.showSuccess('Logout complete!', 'Logout')
    } catch (e) {
      this.notify.showError(e, 'Error: Logout')
      return false
    }

    return true
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  userInfo(): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}/user`, {})
      .pipe(
        tap(resp => {
            console.log(resp)
          },
          err => {
            console.log(err.error)
            this.notify.showError(err.error.message, 'Error: Get user info')
          },
          () => console.log('Complete request')
        )
      )
  }


  refreshToken() {
    return this.http.get<any>(`${environment.apiUrl}/refresh?refreshToken=${this.getRefreshToken()}`, {}).pipe(
      tap((resp) => {
          this.storeJwtToken(resp?.['tokens']?.['acessToken']);
          this.notify.showSuccess('Refresh token complete!', 'Refresh token')
        },
        err => {
          console.log(err.error)
          this.notify.showError(err.error.message, 'Error: Refresh token')
        },
        () => console.log('Complete refresh token')
      ));
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens?.['accessToken']);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
