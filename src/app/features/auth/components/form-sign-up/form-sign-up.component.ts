import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user";
import {NotificationService} from "../../../../core/services/notification.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'form-sign-up',
  template: `
    <form class="sign__form" [formGroup]="form" novalidate (ngSubmit)="onSubmit()">
      <h1 class="sign__header">Sign up</h1>
      <label>
        <input class="sign__input"
               type="text"
               placeholder="First name"
               formControlName="firstName"
               [ngClass]="{'sign__input--error': form.controls['firstName'].invalid &&
                                                    form.controls['firstName'].touched}"
        >
      </label>
      <label>
        <input class="sign__input"
               type="text"
               placeholder="Last name"
               formControlName="lastName"
               [ngClass]="{'sign__input--error': form.controls['lastName'].invalid &&
                                                    form.controls['lastName'].touched}"
        >
      </label>
      <label>
        <input class="sign__input"
               type="email"
               name="email"
               placeholder="Email"
               formControlName="email"
               [ngClass]="{'sign__input--error': form.controls['email'].invalid &&
                                                    form.controls['email'].touched}"
        >
      </label>
      <label>
        <input class="sign__input"
               type="password"
               placeholder="Password"
               name="password"
               formControlName="password"
               [ngClass]="{'sign__input--error': form.controls['password'].invalid &&
                                                    form.controls['password'].touched}"
        >
      </label>
      <button class="sign__button" [disabled]="form.invalid && form.touched">sign</button>
    </form>`,
  styleUrls: ['../../../../../assets/styles/form-sign.css']
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

  constructor(private auth: AuthService) {
  }

  onSubmit() {
    let user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.register(user).subscribe()
  }
}
