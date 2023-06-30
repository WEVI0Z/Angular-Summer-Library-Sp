import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      login: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    })
  }

  submit() {
    const user = {
      login: this.form.value["login"],
      password: this.form.value["password"],
    }
  }
}
