import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {User} from "../../../../core/models/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'form-sign-in',
  template: `
    <form class="sign__form" [formGroup]="form" novalidate (ngSubmit)="onSubmit()">
      <h1 class="sign__header">Sign in</h1>
      <label>
        <input class="sign__input"
               type="email"
               placeholder="Email"
               name="email"
               formControlName="email"
               [ngClass]="{'sign__input--error': form.controls['email'].invalid &&
                                                    form.controls['email'].touched}"
        >
      </label>
      <label>
        <input class="sign__input"
               type="password"
               name="password"
               placeholder="Password"
               formControlName="password"
               [ngClass]="{'sign__input--error': form.controls['password'].invalid &&
                                                    form.controls['password'].touched}"
        >
      </label>
      <button [disabled]="form.invalid && form.touched" class="sign__button">sign</button>
    </form>`,
  styleUrls: ['../../../../../assets/styles/form-sign.css']
})
export class FormSignInComponent {
  form: FormGroup = new FormGroup({
    "email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "password": new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  onSubmit() {
    let user: User = {
      firstName: "",
      lastName: "",
      username: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe()
  }
}
