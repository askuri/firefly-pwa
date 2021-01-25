import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {AutocompleteService} from '../../../services/autocomplete.service';
import {components} from '../../../api-interface/firefly';

/*
 * Source for how this is used as a child component: https://joshblf.medium.com/using-child-components-in-angular-forms-d44e60036664
 * with modification of giving the parentFormControl directly.
 */

@Component({
  selector: 'app-form-account-picker',
  templateUrl: './account-picker.component.html',
  styleUrls: ['./account-picker.component.scss']
})
export class AccountPickerComponent implements OnInit {

  // reference to the parent form
  @Input() parentForm: FormGroup;
  // reference to the Form Control inside the Parent Form so we know where to store the data.
  @Input() parentFormControl: FormControl;

  @Input() accountType: components['schemas']['AccountTypeFilter'];

  constructor(
    private autocompleteService: AutocompleteService
  ) { }

  options: components['schemas']['AutocompleteAccountArray'];
  filteredOptions: Observable<components['schemas']['AutocompleteAccountArray']>;

  ngOnInit(): void {
    this.autocompleteService.getAccounts({ type: this.accountType, limit: -1 })
      .subscribe((data) => {
        this.options = data;

        this.filteredOptions = this.parentFormControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      });
  }

  private _filter(value: string): components['schemas']['AutocompleteAccountArray'] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
