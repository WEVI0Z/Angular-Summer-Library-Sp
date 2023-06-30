import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interface/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AdditionalValidators} from "../../shared/validators/additional-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  incorrect: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private additionalValidators: AdditionalValidators
  ) {
  }

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
    }, {
      validators: this.additionalValidators.passwordMatch(),
    });
  }


  submit() {
    const user: User = {
      login: this.form.value["login"],
      password: this.form.value["password"],
      role: "user",
      balance: 0
    }

    setTimeout(() => {
      this.incorrect = true;
    }, 1000)

    this.userService.register(user).subscribe(user => {
      if (user) {
        this.userService.login(user).subscribe(user => {
          if (user) {
            this.router.navigate(["/user/info"])
          }
        })
      }
    });
  }
}
