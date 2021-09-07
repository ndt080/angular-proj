import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user";
import {NotificationService} from "../../../../core/services/notification.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-form-sign-up',
  template: `
    <form class="sign-up__form" [formGroup]="form" novalidate (ngSubmit)="onSubmit()">
      <h1 class="sign-up__header">Sign-up</h1>
      <label>
        <input class="sign-up__input"
               type="text"
               placeholder="First name"
               formControlName="firstName"
               [ngClass]="{'sign-up__input--error': form.controls['firstName'].invalid &&
                                                    form.controls['firstName'].touched}"
        >
      </label>
      <label>
        <input class="sign-up__input"
               type="text"
               placeholder="Last name"
               formControlName="lastName"
               [ngClass]="{'sign-up__input--error': form.controls['lastName'].invalid &&
                                                    form.controls['lastName'].touched}"
        >
      </label>
      <label>
        <input class="sign-up__input"
               type="email"
               name="email"
               placeholder="Email"
               formControlName="email"
               [ngClass]="{'sign-up__input--error': form.controls['email'].invalid &&
                                                    form.controls['email'].touched}"
        >
      </label>
      <label>
        <input class="sign-up__input"
               type="password"
               placeholder="Password"
               name="password"
               formControlName="password"
               [ngClass]="{'sign-up__input--error': form.controls['password'].invalid &&
                                                    form.controls['password'].touched}"
        >
      </label>
      <button class="sign-up__button" [disabled]="form.invalid && form.touched">Sign-up</button>
    </form>`,
  styleUrls: ['./form-sign-up.component.css']
})
export class FormSignUpComponent {
  form: FormGroup = new FormGroup({
    "firstName": new FormControl("", [
      Validators.required,
    ]),
    "lastName": new FormControl("", [
      Validators.required,
    ]),
    "email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "password": new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private notification: NotificationService, private auth: AuthService) { }

  onSubmit() {
    let user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.email,
      password: this.form.value.password
    }
    let res = this.auth.register(user)

    res.subscribe(r => console.log(r))

    if(res._isScalar){
      this.notification.showSuccess('Sign up success!', '')
    } else {
      this.notification.showError('Sign up error!', '')
    }
  }
}
