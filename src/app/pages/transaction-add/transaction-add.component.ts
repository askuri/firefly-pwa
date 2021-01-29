import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ApiClientService} from '../../services/api-client.service';
import {operations} from '../../api-interface/firefly';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit {

  addTransactionForm = new FormGroup({
    description: new FormControl(''),
    sourceAccount: new FormControl(''),
    destinationAccount: new FormControl(''),
    date: new FormControl(new Date()),
    amount: new FormControl(''),
    budget: new FormControl(''),
    category: new FormControl(''),
    bill: new FormControl(''),
    notes: new FormControl('')
  });

  constructor(
    private apiClientService: ApiClientService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    const formValues = this.addTransactionForm.value;

    const request: operations['storeTransaction']['requestBody']['application/json'] = {
      error_if_duplicate_hash: false,
      apply_rules: false,
      transactions: [
        {
          type: 'withdrawal', // TODO we should find out ourselves what is correct
          description: formValues.description,
          source_id: formValues.sourceAccount.id,
          destination_id: formValues.destinationAccount.id,
          date: formValues.date.toISOString(),
          amount: formValues.amount,
          budget_id: formValues.budget.id,
          category_id: formValues.category.id,
          bill_id: formValues.bill.id,
          notes: formValues.notes
        }
      ]
    };

    this.apiClientService.storeTransaction(request).subscribe(data => {
      console.warn('Submitted new Transaction, received: ', data);
    });
  }
}
