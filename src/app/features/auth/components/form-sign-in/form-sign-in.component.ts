import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../auth.service";
import {User} from "../../../../core/models/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-form-sign-in',
  template: `
    <form class="sign-in__form" [formGroup]="form" novalidate (ngSubmit)="onSubmit()">
      <h1 class="sign-in__header">Sign-in</h1>
      <label>
        <input class="sign-in__input"
               type="email"
               placeholder="Email"
               name="email"
               formControlName="email"
               [ngClass]="{'sign-in__input--error': form.controls['email'].invalid &&
                                                    form.controls['email'].touched}"
        >
      </label>
      <label>
        <input class="sign-in__input"
               type="password"
               name="password"
               placeholder="Password"
               formControlName="password"
               [ngClass]="{'sign-in__input--error': form.controls['password'].invalid &&
                                                    form.controls['password'].touched}"
        >
      </label>
      <button [disabled]="form.invalid && form.touched" class="sign-in__button">Sign-in</button>
    </form>`,
  styleUrls: ['./form-sign-in.component.css']
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

    let res = this.auth.login(user).subscribe()
  }
}
