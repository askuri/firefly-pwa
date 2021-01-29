import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiTokenService {
  private TOKEN_NAME = 'firefly-pwa_api_token';

  constructor() { }

  public setToken(token: string): void {
    // we need to remove the old one, otherwise it's turned into
    // an array in localStorage
    if (this.isTokenSet()) {
      this.deleteToken();
    }
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  public deleteToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  public isTokenSet(): boolean {
    const token = this.getToken();

    return !(!token || 0 === token.length);
  }
}
