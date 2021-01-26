import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AutocompleteService} from '../../../services/autocomplete.service';
import {components, paths} from '../../../api-interface/firefly';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-form-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent<T extends paths['/api/v1/autocomplete/bills']
  | paths['/api/v1/autocomplete/budgets']> implements OnInit {
  // reference to the parent form
  @Input() parentForm: FormGroup;
  // reference to the Form Control inside the Parent Form so we know where to store the data.
  @Input() parentFormControl: FormControl;

  @Input() t: T;
  @Input() tPath: string;

  options: T['get']['responses'][200]['application/json'];
  filteredOptions: Observable<T['get']['responses'][200]['application/json']>;

  constructor(
    private autocompleteService: AutocompleteService,
  ) { }

  ngOnInit(): void {
    this.autocompleteService.getAutocomplete<T>({ limit: -1 }, this.tPath)
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

  private _filter(value: string): T['get']['responses'][200]['application/json'] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  /**
   * Gives the display name of autocomplete entry. Used with displayWith
   */
  displayFn(entry: AutocompleteEntryInterface): string {
    return entry && entry.name ? entry.name : '';
  }
}

/**
 * Each entry of an AutocompleteXxxArray looks like this.
 * To avoid writing long generics for that as well, we just manually define
 * the interface here.
 */
interface AutocompleteEntryInterface {
  id: number;
  name: string;
}
