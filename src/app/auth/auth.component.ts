import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin = false;

  constructor() {}

  ngOnInit(): void {}

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value);
  }
}
