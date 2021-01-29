import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiTokenService} from './api-token.service';
import {Observable} from 'rxjs';
import {components, operations} from '../api-interface/firefly';

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

  public post(url: string, body): Observable<object> {
    return this.http.post(url, body, {
      headers: {
        Authorization: 'Bearer ' + this.apiTokenService.getToken()
      }
    });
  }

  public storeTransaction(transaction: operations['storeTransaction']['requestBody']['application/json']):
    Observable<components['schemas']['TransactionSingle'] | components['schemas']['ValidationError']>
  {
    return this.post('api/v1/transactions', transaction) as Observable<components['schemas']['TransactionSingle'] | components['schemas']['ValidationError']>;
  }
}
