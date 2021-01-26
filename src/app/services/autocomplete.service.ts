import { Injectable } from '@angular/core';

import { operations, components } from '../api-interface/firefly';
import {ApiClientService} from './api-client.service';
import {Observable} from 'rxjs';

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
}
