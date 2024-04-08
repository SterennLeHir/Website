import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const USER_ID = 'id';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public clear(): void {
    localStorage.clear();
  }
  public save(token: string, id: number): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID, id.toString()); // to know who is connected
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }

  public getUserId(): number {
    const id = localStorage.getItem(USER_ID);
    return id === null ? NaN : Number(id);
  }
  public isLogged(): boolean {
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }
}
