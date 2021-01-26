import { Injectable } from '@angular/core';

import { operations, components } from '../api-interface/firefly';
import {ApiClientService} from './api-client.service';
import {Observable} from 'rxjs';
import { paths } from '../api-interface/firefly';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(
    private apiClient: ApiClientService
  ) { }

  getAccounts(params: operations['getAccountsAC']['parameters']['query']): Observable<components['schemas']['AutocompleteAccountArray']> {
    return this.apiClient.get('/api/v1/autocomplete/accounts', params) as Observable<components['schemas']['AutocompleteAccountArray']>;
  }

  getBudgets(params: operations['getBudgetsAC']['parameters']['query']): Observable<components['schemas']['AutocompleteBudgetArray']> {
    return this.apiClient.get('/api/v1/autocomplete/budgets', params) as Observable<components['schemas']['AutocompleteBudgetArray']>;
  }

  /**
   * Workaround for getting the name of the type, which is the actual path: https://stackoverflow.com/a/50932964/11836707
   */
  getAutocomplete<TPath extends paths['/api/v1/autocomplete/bills']
                              | paths['/api/v1/autocomplete/budgets']
  >(params: TPath['get']['parameters']['query'], path: string): Observable<TPath['get']['responses'][200]['application/json']> {
    return this.apiClient.get(path, params) as Observable<TPath['get']['responses'][200]['application/json']>;
  }
}
