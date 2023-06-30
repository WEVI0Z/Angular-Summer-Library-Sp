import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interface/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private userService: UserService, private router: Router) {
  }

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
    const user: User = {
      login: this.form.value["login"],
      password: this.form.value["password"],
      balance: 0,
    }

    if(this.userService.login(user)) {
      this.router.navigate(["/user/info"]);
    }
  }
}
