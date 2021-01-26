import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {components} from '../../../api-interface/firefly';
import {AutocompleteService} from '../../../services/autocomplete.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-form-budget-picker',
  templateUrl: './budget-picker.component.html',
  styleUrls: ['./budget-picker.component.scss']
})
export class BudgetPickerComponent implements OnInit {

  // reference to the parent form
  @Input() parentForm: FormGroup;
  // reference to the Form Control inside the Parent Form so we know where to store the data.
  @Input() parentFormControl: FormControl;

  constructor(
    private autocompleteService: AutocompleteService
  ) { }

  options: components['schemas']['AutocompleteBudgetArray'];
  filteredOptions: Observable<components['schemas']['AutocompleteBudgetArray']>;

  ngOnInit(): void {
    this.autocompleteService.getBudgets({ limit: -1 })
      .subscribe((data) => {
        this.options = data;

        this.filteredOptions = this.parentFormControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
          );
      });
  }

  /**
   * Gives the display name of autocomplete entry. Used with displayWith
   */
  displayFn(budget: components['schemas']['AutocompleteBudget']): string {
    return budget && budget.name ? budget.name : '';
  }

  private _filter(value: string): components['schemas']['AutocompleteBudgetArray'] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
