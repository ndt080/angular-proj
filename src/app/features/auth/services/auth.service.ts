import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {User} from "../../../core/models/user";
import {NotificationService} from "../../../core/services/notification.service";
import {Router} from "@angular/router";
import {StorageAuthService} from "./storage-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly stopRefreshToken: Subject<void> = new Subject();
  private loggedUser: string = '';

  constructor(private http: HttpClient, private notify: NotificationService,
              private router: Router, private storage: StorageAuthService) {
  }

  login(user: User): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
      .pipe(
        tap((resp) => {
            const {tokens, username}: any = resp;
            this.loggedUser = username;
            this.storage.storeTokens(tokens);
            this.router.navigate(['/']);

            let delay = tokens?.['exparedAt'] as number * 1000;
            this.timerRefreshToken(delay - 60000, delay - 60000)
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
        tap((resp) => {
            const {tokens, username}: any = resp;
            this.loggedUser = username;
            this.storage.storeTokens(tokens);
            this.router.navigate(['/']);

            let delay = tokens?.['exparedAt'] as number * 1000;
            this.timerRefreshToken(delay - 60000, delay - 60000)
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
      this.storage.removeTokens();
      this.stopRefreshToken.next()
      this.router.navigate(['/login']);
      this.notify.showSuccess('Logout complete!', 'Logout')
    } catch (e) {
      this.notify.showError(e, 'Error: Logout')
      return false
    }

    return true
  }

  isLoggedIn() {
    return !!this.storage.getJwtToken();
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

  timerRefreshToken(delay: number, tick: number) {
    timer(delay, tick).pipe(
      takeUntil(this.stopRefreshToken),
      tap((_) => {
        this.refreshToken();
      }),
    ).subscribe();
  }

  refreshToken() {
    return this.http.get<any>(`${environment.apiUrl}/refresh?refreshToken=${this.storage.getRefreshToken()}`,
      {}).pipe(
      tap((resp) => {
          this.storage.storeJwtToken(resp?.['tokens']?.['acessToken']);
          this.notify.showSuccess('Refresh token complete!', 'Refresh token')
        },
        err => {
          console.log(err.error)
          this.notify.showError(err.error.message, 'Error: Refresh token')
        },
        () => console.log('Complete refresh token')
      ));
  }

}
