import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TransactionAddComponent} from './components/transaction-add/transaction-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transaction/new', component: TransactionAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
