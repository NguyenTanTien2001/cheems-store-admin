import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GC_AUTH_TOKEN, GC_USER_ID } from 'src/assets/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string = '';

  // 3
  private _isAuthenticated = new BehaviorSubject(false);

  constructor() {
  }

  // 4
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }
  // 5
  saveUserData(id: string, token: string) {

    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.setUserId(id);
  }

  // 6
  setUserId(id: string) {
    this.userId = id;

    this._isAuthenticated.next(true);
  }
  // 7
  logout() {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.userId = '';

    this._isAuthenticated.next(false);
  }

  // 8
  autoLogin() {
    const id = localStorage.getItem(GC_USER_ID);

    if (id) {
      this.setUserId(id);
    }
  }

  getUserData() {

  }

  getToken() {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    return token;
  }
}
