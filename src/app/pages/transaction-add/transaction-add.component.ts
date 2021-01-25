import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    date: new FormControl(''),
    amount: new FormControl(''),
    budget: new FormControl(''),
    category: new FormControl(''),
    tags: new FormControl(''),
    bill: new FormControl(''),
    notes: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.addTransactionForm.value);
  }
}
