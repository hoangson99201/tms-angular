import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static activeUser: User = {};

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.getCookie('token');
  }

  getCookie(name: string): string | null {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

  login(user: User): Observable<string> {
    return this.http.post('/tms/api/v1/login', user, { responseType: 'text' });
  }

  load(): Observable<any> {
    return this.http.get('/tms/api/v1/login').pipe(
      tap(user => {
        AuthService.activeUser = user;
      }),
      catchError(error => {
        console.log(error);
        if (['/tms/login', '/tms/signup'].includes(window.location.pathname)) {
          return EMPTY;
        }
        return this.router.navigateByUrl('/login');
      })
    );
  }

  isActive(functionalityName: string): boolean {
    return AuthService.activeUser.functionalities?.find(f => f.functionalityName?.toUpperCase() === functionalityName.toUpperCase()) ? true : false;
  }

  static authServiceFactory(authService: AuthService): Function {
    return () => authService.load();
  }

  signup(user: User): Observable<string> {
    return this.http.post("/tms/api/v1/signup", user, {
      responseType: 'text'
    });
  }
}
