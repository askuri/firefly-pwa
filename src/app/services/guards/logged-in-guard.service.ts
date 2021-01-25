import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiTokenService } from '../api-token.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuardService implements CanActivate {

  constructor(
    private router: Router,
    private apiTokenService: ApiTokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): boolean {
    if (this.apiTokenService.isTokenSet()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
