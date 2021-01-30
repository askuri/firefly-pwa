import { Injectable } from '@angular/core';

import { operations, components } from '../api-interface/firefly';
import {ApiClientService} from './api-client.service';
import {Observable} from 'rxjs';
import { paths } from '../api-interface/firefly';
import {Entry, QueryParameter} from '../api-interface/autocomplete';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(
    private apiClient: ApiClientService
  ) { }

  getAccounts(params: operations['getAccountsAC']['parameters']['query']): Observable<components['schemas']['AutocompleteAccountArray']> {
    return this.apiClient.get('api/v1/autocomplete/accounts', params) as Observable<components['schemas']['AutocompleteAccountArray']>;
  }

  getAutocomplete(params: QueryParameter, path: string): Observable<Entry[]> {
    return this.apiClient.get(path, params) as Observable<Entry[]>;
  }
}
