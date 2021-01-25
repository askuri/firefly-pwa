import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiTokenService} from '../../services/api-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    personalAccessToken: new FormControl('')
  });

  constructor(
    public apiTokenService: ApiTokenService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apiTokenService.setToken(this.loginForm.get('personalAccessToken').value);
  }
}
