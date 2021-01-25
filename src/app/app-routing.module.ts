import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TransactionAddComponent} from './pages/transaction-add/transaction-add.component';
import { LoggedInGuardService } from './services/guards/logged-in-guard.service';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'transaction/new', component: TransactionAddComponent, canActivate: [LoggedInGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
