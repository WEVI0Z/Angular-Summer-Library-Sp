import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      login: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
      passwordConfirmation: new FormControl(null, [
        Validators.required,
      ]),
    })
  }


  submit() {
    const user = {
      login: this.form.value["login"],
      password: this.form.value["password"],
    }
  }
}
