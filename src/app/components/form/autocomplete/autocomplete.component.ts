import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AutocompleteService} from '../../../services/autocomplete.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Entry} from '../../../api-interface/autocomplete';

@Component({
  selector: 'app-form-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  // reference to the parent form
  @Input() parentForm: FormGroup;
  // reference to the Form Control inside the Parent Form so we know where to store the data.
  @Input() parentFormControl: FormControl;

  @Input() apiPath: string;
  @Input() label: string;
  @Input() isRequired = false;

  options: Entry[];
  filteredOptions: Observable<Entry[]>;

  constructor(
    private autocompleteService: AutocompleteService,
  ) { }

  ngOnInit(): void {
    this.autocompleteService.getAutocomplete({ limit: -1 }, this.apiPath)
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

  private _filter(value: string): Entry[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  /**
   * Gives the display name of autocomplete entry. Used with displayWith
   */
  displayFn(entry: Entry): string {
    return entry && entry.name ? entry.name : '';
  }
}

