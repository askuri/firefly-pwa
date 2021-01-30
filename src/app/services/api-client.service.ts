import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiTokenService} from './api-token.service';
import {Observable} from 'rxjs';
import {components, operations} from '../api-interface/firefly';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private host = 'https://firefly.askuri.de/';

  constructor(
    private http: HttpClient,
    private apiTokenService: ApiTokenService
  ) { }

  /**
   * Perform a GET request against the API.
   *
   * @param path e.g. 'api/v1/transactions'
   * @param params Query parameters
   */
  public get(path: string, params): Observable<object> {
    return this.http.get(this.host + path, {
      params,
      headers: {
        Authorization: 'Bearer ' + this.apiTokenService.getToken()
      }
    });
  }

  /**
   * Perform a POST request against the API.
   *
   * @param path e.g. 'api/v1/transactions'
   */
  public post(path: string, body): Observable<object> {
    return this.http.post(this.host + path, body, {
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
