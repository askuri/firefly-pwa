import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {ApiTokenService} from '../api-token.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuardService {

  constructor(
    private router: Router,
    private apiTokenService: ApiTokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): boolean {
    if (!this.apiTokenService.isTokenSet()) {
      return true;
    } else {
      return false;
    }
  }
}
