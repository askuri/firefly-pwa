import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiTokenService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem('firefly-pwa_api_token', token);
  }

  public getToken(): string {
    return localStorage.getItem('firefly-pwa_api_token');
  }

  public isTokenSet(): boolean {
    const token = this.getToken();

    return !(!token || 0 === token.length);
  }
}
