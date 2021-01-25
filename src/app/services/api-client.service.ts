import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiTokenService} from './api-token.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(
    private http: HttpClient,
    private apiTokenService: ApiTokenService
  ) { }

  public get(url: string, params): Observable<object> {
    return this.http.get(url, {
      params,
      headers: {
        Authorization: 'Bearer ' + this.apiTokenService.getToken()
      }
    });
  }
}
